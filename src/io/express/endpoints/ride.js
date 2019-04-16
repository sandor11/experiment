"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_owner_rides_1 = require("../../../application/shared/get-owner-rides");
const ride_1 = require("../../postgres/ride");
const http_1 = require("../../http");
const GetOwnerRides = {
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
    parse: (request) => ({
        type: "ride.getownerrides",
        owner: request.query["owner"]
    }),
    handle: get_owner_rides_1.getOwnerRidesHandler(ride_1.findRidesByOwner),
    response: http_1.jsonResponse(200)
};
exports.RideEndpoints = [GetOwnerRides];
//# sourceMappingURL=ride.js.map