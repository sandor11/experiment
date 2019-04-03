// here is where you decide that your core application will work off commands, queries and results...

export interface Action {
  type: string;
}
export interface Command extends Action {}
export interface Query extends Action {}

export interface Result {}
export interface Success extends Result {}
export interface Failure extends Result {}

// here is the reason you need the above. Its all well and good to have different
// types of things, but at some point, you need a common interface
export type Handler<T> = (action: T) => Result;
