import express = require("express");

// here is where you decide that your core application will work off commands, queries and results...
export interface Action {}
export interface Command extends Action {}
export interface Query extends Action {}

export interface Result {}
export interface Success extends Result {}
export interface Failure extends Result {}

// here is the reason you need the above. Its all well and good to have different
// types of things, but at some point, you need a common interface
export type Handler<T> = (action: T) => Result;

interface Greeting extends Command {
  greeting: string;
}

interface Hello extends Success {
  hello: string;
}

interface HelloRepository {
  findGreeting(): string;
}

class InMemoryHelloRepository implements HelloRepository {
  findGreeting() {
    return "yolo db";
  }
}

export const sayHelloUseCase = (
  repo: HelloRepository,
  command: Greeting
): Hello => {
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
export const sayHelloHandler = (repo: HelloRepository): Handler<Greeting> => (action): Hello =>
  sayHelloUseCase(repo, action); // note the possibility of passing this repository in

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

