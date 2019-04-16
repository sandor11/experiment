"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const say_hello_1 = require("../../../application/shared/say-hello");
const greeting_1 = require("../../postgres/greeting");
const http_1 = require("../../http");
const SayHello = {
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
    parse: (request) => ({
        type: "hello.greeting",
        speech: request.query["speech"] || "couldnt find your speech",
        other: 7
    }),
    handle: say_hello_1.sayHelloHandler(greeting_1.findGreeting),
    response: http_1.jsonResponse(200)
};
exports.HelloEndpoints = [SayHello];
//# sourceMappingURL=hello.js.map