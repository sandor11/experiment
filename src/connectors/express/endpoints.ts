import express = require("express");
import { SayHello, sayHelloHandler, Hello } from "../../app/say-hello";
import { ExpressController } from "./controllers";
import { InMemoryHelloRepository } from "../postgres/hello-repository";
import { Http } from "../http";

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
      type: "string",
      required: true,
      location: "body"
    }
  ],
  parse: (request: express.Request): SayHello => ({
    type: "hello.greeting",
    speech: request.query["speech"] || "couldnt find your speech",
    other: 7
  }),
  handle: sayHelloHandler(new InMemoryHelloRepository()),
  response: result => ({
    statusCode: 200,
    body: result
  })
};

export const configureEndpoints = (controller: ExpressController) => {
  return {
    hello: {
      sayHello: controller(SayHello)
    }
  };
};
