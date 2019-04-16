import express = require("express");
import { Action, Failure, Result, Success } from "../../../application";
import { Http } from "../";
import { HelloEndpoints } from "./endpoints/hello";
import { RideEndpoints } from "./endpoints/ride";

type ExpressController = (
  endpoint: Http.Endpoint<express.Request, Action, Result>
) => (req: express.Request, res: express.Response) => void;
const expressController: ExpressController = endpoint => (req, res) => {
  const { success, handle, parse } = endpoint;
  const response = jsonResponse(success);
  try {
    res.status(success).send(response(handle(parse(req))));
  } catch (err) {
    const failure: Http.Response<Failure> = {
      statusCode: 500,
      body: err.message
    };
    res.status(failure.statusCode).send(failure);
  }
};

const routeEndpointThroughExpress = (
  app: express.Application,
  controller: ExpressController
) => (endpoint: Http.Endpoint<express.Request, Action, Result>) => {
  switch (endpoint.method) {
    case "GET":
      app.get(endpoint.path, controller(endpoint));
      break;
    case "POST":
      app.post(endpoint.path, controller(endpoint));
      break;
    default:
      app.get(endpoint.path, controller(endpoint));
  }
};

const jsonResponse = <T extends Success>(
  status: Http.Status,
  headers: Http.Headers = {}
): Http.EndpointResponse<T> => (result: T): Http.Response<T> => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: result
});

export const configure = (app: express.Application) => {
  const endpoints = [...HelloEndpoints, ...RideEndpoints];
  endpoints.map(routeEndpointThroughExpress(app, expressController));
};
