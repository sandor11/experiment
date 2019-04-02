"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const say_hello_1 = require("../app/say-hello");
const parseGreeting = (request) => ({
    type: "hello.greeting",
    greeting: "Hello..." // this would normlly be pulled off the request header, or post params etc...
});
const expressController = parse => handler => (req, res) => {
    try {
        const result = handler(parse(req));
        res.status(200).send(result);
    }
    catch (err) {
        const result = {
            statusCode: 500,
            error: err.message
        };
        res.status(500).send(result);
    }
};
const handlers = {
    hello: {
        // this could be module or some other grouping
        greeting: (a) => {
            return secure(a, b => loggable(b, say_hello_1.sayHelloHandler(new say_hello_1.InMemoryHelloRepository())));
        } // Handler<Greeting>
    }
};
const configureControllers = (controller) => {
    return {
        hello: {
            sayHello: controller(parseGreeting)(handlers.hello.greeting)
        }
    };
};
const controllers = configureControllers(expressController); // this call will then partially apply the configuration of the unresolved params such as the repository to use etc...
// so here is where the linkage will actually happen between express and your stuff.
// so you will essentially be hanging out in the infrastructure layer, and you will pull up
// everything required to fill the
exports.configureRoutes = (app) => {
    app.get("/", controllers.hello.sayHello);
};
const loggable = (action, next) => {
    console.log(action);
    return next(action);
};
const secure = (action, next) => {
    console.log("Secured...", action);
    return next(action);
};
//# sourceMappingURL=express.js.map