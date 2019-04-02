import express = require("express");
import { Action, Handler, Result } from "../app/core";
import { Greeting, sayHelloHandler, InMemoryHelloRepository } from "../app/say-hello";

// we need a way to parse the input from the outside world, into your Greeting type
type ExpressRequestParser<T> = (request: express.Request) => T;
const parseGreeting: ExpressRequestParser<Greeting> = (
  request: Express.Request
): Greeting => ({
  greeting: "composable world!"
});

// now we can start to handle this a bit more generically
// we now need something to take a handler and also know how to parse the input
// and hand it off to the handler
type ExpressController<T> = (handler: Handler<T>, parse: ExpressRequestParser<T>) => (req: express.Request, res: express.Response) => void;
const expressController: ExpressController<Action> = (handler, parse) => (req, res) => {
  try {
    const result: Result = handler(parse(req));
    res.status(200).send(result);
  } catch (err) {
    const result = {
      statusCode: 500,
      error: err.message
    };
    res.status(500).send(result);
  }
};

export const configureControllers = (controller: ExpressController<Action>) => {
  return {
    hello: { // this could be module or some other grouping
      sayHello: expressController(sayHelloHandler(new InMemoryHelloRepository()), parseGreeting) // ExpressController<Greeting>
    }
  };
};
const controllers = configureControllers(expressController); // this call will then partially apply the configuration of the unresolved params such as the repository to use etc...

// so here is where the linkage will actually happen between express and your stuff.
// so you will essentially be hanging out in the infrastructure layer, and you will pull up
// everything required to fill the
export const configureRoutes = (app: express.Application) => {
  app.get("/", controllers.hello.sayHello);
};