import { Command, Handler, Success } from "../app/core";
import { Greeter } from "../lib/hello";

export interface Greeting extends Command {
  greeting: string;
}

export interface Hello extends Success {
  hello: string;
}

export interface HelloRepository {
  findGreeting(extra: string): Greeter;
}

export class InMemoryHelloRepository implements HelloRepository {
  findGreeting(extra: string) {
    return new Greeter(extra);
  }
}

export const sayHelloUseCase = (
  repo: HelloRepository,
  command: Greeting
): Hello => {
  const greeter: Greeter = repo.findGreeting(command.greeting);
  return {
    hello: greeter.talk()
  };
};

// this is the thing that you are trying to get to...
// at this point, you can write all your apps tests if you have these handlers
// this is where your business domain starts
// you have sais, hey, if you give me an action (of type Greeting)
// I will give you back a result (of type Hello)
//
// however, this needs to be plugged in to the outside world in order to be useful.
export const sayHelloHandler = (repo: HelloRepository): Handler<Greeting> => (
  action
): Hello => sayHelloUseCase(repo, action); // note the possibility of passing this repository in
