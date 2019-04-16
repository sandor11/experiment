import * as express from "express";
import {
  GetOwnerRides,
  getOwnerRidesHandler,
  GetOwnerRidesData
} from "../../../application/shared/get-owner-rides";
import { findRidesByOwner } from "../../postgres/ride";
import { Http, jsonResponse } from "../../http";

const GetOwnerRides: Http.Endpoint<GetOwnerRides, GetOwnerRidesData> = {
  ref: "get-ride",
  resource: "ride",
  description: "gets a list of rides beloninging to an owner",
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  path: "/ride",
  params: [
    {
      name: "owner",
      required: true,
      location: "query"
    }
  ],
  parse: (request: express.Request) => ({
    type: "ride.getownerrides",
    owner: request.query["owner"]
  }),
  handle: getOwnerRidesHandler(findRidesByOwner),
  response: jsonResponse(200)
};

export const RideEndpoints = [GetOwnerRides];
