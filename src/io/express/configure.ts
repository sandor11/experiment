import * as express from "express";
import { Action, Failure, Result } from "../../application/structure";
import { HelloEndpoints } from "./endpoints/hello";
import { RideEndpoints } from "./endpoints/ride";
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

export const configure = (app: express.Application) => {
  [...HelloEndpoints, ...RideEndpoints].forEach(
    routeEndpointThroughExpress(app, expressController)
  );
};
