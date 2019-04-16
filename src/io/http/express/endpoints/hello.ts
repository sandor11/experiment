import express = require("express");
import { Commands, Results, sayHello } from "../../../../application";
import { findGreeting } from "../../../postgres/greeting";
import { Http } from "../../";

const parseSayHello: Http.EndpointRequestParser<
  express.Request,
  Commands.SayHello
> = request => {
  return {
    type: "hello.greeting",
    speech: request.query["speech"] || "couldnt find your speech",
    other: 7
  };
};

const SayHello: Http.Endpoint<
  express.Request,
  Commands.SayHello,
  Results.Hello
> = {
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
  parse: parseSayHello,
  handle: sayHello(findGreeting),
  success: 200
};

export const HelloEndpoints = [SayHello];
