import { Command, Success, Handler } from "../structure";
import { FindGreeting, Greeting, greet } from "../../domain/greeting";

export type SayHello = Command & {
  speech: string;
  other: number;
};

export type Hello = Success & {
  hello: string;
};

const sayHelloUseCase = (find: FindGreeting, command: SayHello): Hello => {
  const greeting: Greeting = find(command.speech);
  return {
    hello: greet(greeting)
  };
};

export const sayHelloHandler = (
  find: FindGreeting
): Handler<SayHello, Hello> => (action): Hello => sayHelloUseCase(find, action);
