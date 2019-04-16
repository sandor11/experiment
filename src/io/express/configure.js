"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./endpoints/hello");
const ride_1 = require("./endpoints/ride");
const expressController = endpoint => (req, res) => {
    const { response, handle, parse } = endpoint;
    try {
        res.status(200).send(response(handle(parse(req))));
    }
    catch (err) {
        const response = {
            statusCode: 500,
            body: err.message
        };
        res.status(500).send(response);
    }
};
const routeEndpointThroughExpress = (app, controller) => (endpoint) => {
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
exports.configure = (app) => {
    [...hello_1.HelloEndpoints, ...ride_1.RideEndpoints].forEach(routeEndpointThroughExpress(app, expressController));
};
//# sourceMappingURL=configure.js.map