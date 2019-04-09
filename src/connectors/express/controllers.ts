import express = require("express");
import { Action, Failure, Result } from "../../app/core";
import { endpoints } from "./endpoints";
import { Http } from "../http";

type ExpressController = (
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
  app.get(
    endpoints.hello.sayHello.path,
    expressController(endpoints.hello.sayHello)
  );
};
