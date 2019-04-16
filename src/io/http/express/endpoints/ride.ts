import express = require("express");
import { Queries, getOwnerRides, Results } from "../../../../application";
import { findRidesByOwner } from "../../../postgres/ride";
import { Http } from "../../";

const GetOwnerRides: Http.Endpoint<
  express.Request,
  Queries.GetOwnerRides,
  Results.GetOwnerRidesData
> = {
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
  parse: request => ({
    type: "ride.getownerrides",
    owner: request.query["owner"]
  }),
  handle: getOwnerRides(findRidesByOwner),
  success: 200
};

export const RideEndpoints = [GetOwnerRides];
