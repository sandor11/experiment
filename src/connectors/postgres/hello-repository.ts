import { Greeting } from "../../domain/greeting";
import { HelloRepository } from "../../app/say-hello";

export class InMemoryHelloRepository implements HelloRepository {
  findGreeting(extra: string) {
    return new Greeting(extra);
  }
}
