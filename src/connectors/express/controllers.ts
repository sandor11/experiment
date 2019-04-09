import express = require("express");
import { Action, Failure, Result } from "../../app/core";
import { configureEndpoints } from "./endpoints";
import { Http } from "../http";

export type ExpressController = (
  endpoint: Http.Endpoint<Action, Result>
) => (req: express.Request, res: express.Response) => void;
const expressController: ExpressController = endpoint => (req, res) => {
  const { response, handle, parse } = endpoint;
  try {
    res.status(200).send(response(handle(parse(req))));
  } catch (err) {
    const response: Http.Response<Failure> = {
      statusCode: 500,
      body: err.message
    };
    res.status(500).send(response);
  }
};

export const configureRoutes = (app: express.Application) => {
  const endpoints = configureEndpoints(expressController);

  app.get("/", endpoints.hello.sayHello);
};
