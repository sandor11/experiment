// data shape and stucture
export type Greeting = {
  basic: string;
  extra: string;
};

// define operations over data
export type Greet = (greeting: Greeting) => string;
export type FindGreeting = (extra: string) => Greeting;

// default implementations where no IO is required
export const greet: Greet = greeting =>
  [greeting.extra, greeting.basic].join(", ");
