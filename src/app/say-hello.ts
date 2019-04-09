import { Command, Success, Handler } from "./core";
import { Greeting } from "../domain/greeting";

export interface SayHello extends Command {
  speech: string;
  other: number;
}

export interface Hello extends Success {
  hello: string;
}

export interface HelloRepository {
  findGreeting(extra: string): Greeting;
}

const sayHelloUseCase = (repo: HelloRepository, command: SayHello): Hello => {
  const greeting: Greeting = repo.findGreeting(command.speech);
  return {
    hello: greeting.greet()
  };
};

export const sayHelloHandler = (repo: HelloRepository): Handler<SayHello, Hello> => (
  action
): Hello => sayHelloUseCase(repo, action);
