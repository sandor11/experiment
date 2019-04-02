"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryHelloRepository {
    findGreeting() {
        return "yolo db";
    }
}
exports.sayHelloUseCase = (repo, command) => {
    const greeting = repo.findGreeting();
    return {
        hello: [greeting, command.greeting].join(", ")
    };
};
// this is the thing that you are trying to get to...
// at this point, you can write all your apps tests if you have these handlers
// this is where your business domain starts
// you have sais, hey, if you give me an action (of type Greeting)
// I will give you back a result (of type Hello)
//
// however, this needs to be plugged in to the outside world in order to be useful.
exports.sayHelloHandler = (repo) => (action) => exports.sayHelloUseCase(repo, action); // note the possibility of passing this repository in
const parseGreeting = (request) => ({
    greeting: "composable world!"
});
const expressController = (handler, parse) => (req, res) => {
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
exports.configureControllers = (controller) => {
    return {
        hello: {
            sayHello: expressController(exports.sayHelloHandler(new InMemoryHelloRepository()), parseGreeting) // ExpressController<Greeting>
        }
    };
};
const controllers = exports.configureControllers(expressController); // this call will then partially apply the configuration of the unresolved params such as the repository to use etc...
// so here is where the linkage will actually happen between express and your stuff.
// so you will essentially be hanging out in the infrastructure layer, and you will pull up
// everything required to fill the
exports.configureRoutes = (app) => {
    app.get("/", controllers.hello.sayHello);
};
//# sourceMappingURL=core.js.map