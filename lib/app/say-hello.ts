import { Command, Success } from "../app/core";
import { Greeter } from "../domain/hello";

export interface Greeting extends Command {
  greeting: string;
}

export interface Hello extends Success {
  hello: string;
}

export interface HelloRepository {
  findGreeting(extra: string): Greeter;
}
