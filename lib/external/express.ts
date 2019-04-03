import express = require("express");
import { Action, Handler, Result } from "../app/core";

// we need a way to parse the input from the outside world, into your Greeting type
export type ExpressRequestParser<T> = (request: express.Request) => T;

// now we can start to handle this a bit more generically
// we now need something to take a handler and also know how to parse the input
// and hand it off to the handler
export type ExpressController<T> = (
  parse: ExpressRequestParser<T>
) => (
  handler: Handler<Action>
) => (req: express.Request, res: express.Response) => void;

export type ComposableHandler<T> = (action: T, next: Handler<T>) => Result;

