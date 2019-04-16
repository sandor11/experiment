import * as express from "express";
import {
  SayHello,
  sayHelloHandler,
  Hello
} from "../../../application/shared/say-hello";
import { findGreeting } from "../../postgres/greeting";
import { Http, jsonResponse } from "../../http";

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
  handle: sayHelloHandler(findGreeting),
  response: jsonResponse(200)
};

export const HelloEndpoints = [SayHello];
