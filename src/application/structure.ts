// here is where you decide that your core application will work off commands, queries and results...

export type Action = {};
export type Command = Action & {};
export type Query = Action & {};

export type Result = {};
export type Success = Result & {};
export type Failure = Result & {};

// here is the reason you need the above. Its all well and good to have different
// types of things, but at some point, you need a common interface
export type Handler<T extends Command | Query, R extends Success | Failure> = (
  action: T
) => R;
