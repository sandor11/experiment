import { FindGreeting } from "../../domain/greeting";
import { GreetingModel } from "./orm/greeting-model";

// lets pretent we needed to do some IO here and
// lookup a greeting based on some extra value here
export const findGreeting: FindGreeting = extra =>
  new GreetingModel().findGreeting(extra);
