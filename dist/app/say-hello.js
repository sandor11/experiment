"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("../lib/hello");
class InMemoryHelloRepository {
    findGreeting(extra) {
        return new hello_1.Greeter(extra);
    }
}
exports.InMemoryHelloRepository = InMemoryHelloRepository;
exports.sayHelloUseCase = (repo, command) => {
    const greeter = repo.findGreeting(command.greeting);
    return {
        hello: greeter.talk()
    };
};
// this is the thing that you are trying to get to...
// at this point, you can write all your apps tests if you have these handlers
// this is where your business domain starts
// you have sais, hey, if you give me an action (of type Greeting)
// I will give you back a result (of type Hello)
//
// however, this needs to be plugged in to the outside world in order to be useful.
exports.sayHelloHandler = (repo) => (action) => exports.sayHelloUseCase(repo, action); // note the possibility of passing this repository in
//# sourceMappingURL=say-hello.js.map