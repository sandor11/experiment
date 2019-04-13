import { Greeting } from "../../../domain/greeting";

// so all the ORM mapping stuff can be concealed behind a veil of
// sanity and nothing outside the postgres folder should ever import
// from the postgres orm folder.
export class GreetingModel {
  findGreeting(extra: string): Greeting {
    return {
      basic: "Hello from ORM",
      extra
    };
  }
}
