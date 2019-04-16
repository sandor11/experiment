import { Commands, Results, Handler } from "../";
import { FindGreeting, Greeting, greet } from "../../domain/greeting";

const sayHelloUseCase = (
  find: FindGreeting,
  command: Commands.SayHello
): Results.Hello => {
  const greeting: Greeting = find(command.speech);
  return {
    hello: greet(greeting)
  };
};

export const sayHello = (
  find: FindGreeting
): Handler<Commands.SayHello, Results.Hello> => (action): Results.Hello =>
  sayHelloUseCase(find, action);
