import express = require("express");
import { Action, Failure, Result } from "../../app/core";
import { helloEndpoints } from "./hello-endpoints";
import { rideEndpoints } from "./ride-endpoints";
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

const routeEndpointThroughExpress = (
  app: express.Application,
  controller: ExpressController
) => (endpoint: Http.Endpoint<Action, Result>) => {
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

export const configureRoutes = (app: express.Application) => {
  [...helloEndpoints, ...rideEndpoints].forEach(
    routeEndpointThroughExpress(app, expressController)
  );
};
