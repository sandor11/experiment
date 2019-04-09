import express = require("express");
import { SayHello, sayHelloHandler, Hello } from "../../app/say-hello";
import { InMemoryHelloRepository } from "../postgres/hello-repository";
import { Http, jsonResponse } from "../http";

const SayHello: Http.Endpoint<SayHello, Hello> = {
  ref: "say-hello",
  resource: "greeting",
  description: "top o' the mornin to yeh...",
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  path: "/greeting",
  params: [
    {
      name: "speech",
      required: true,
      location: "query"
    }
  ],
  parse: (request: express.Request) => ({
    type: "hello.greeting",
    speech: request.query["speech"] || "couldnt find your speech",
    other: 7
  }),
  handle: sayHelloHandler(new InMemoryHelloRepository()),
  response: jsonResponse(200)
};

export const helloEndpoints = [SayHello];
