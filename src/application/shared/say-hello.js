"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greeting_1 = require("../../domain/greeting");
const sayHelloUseCase = (find, command) => {
    const greeting = find(command.speech);
    return {
        hello: greeting_1.greet(greeting)
    };
};
exports.sayHelloHandler = (find) => (action) => sayHelloUseCase(find, action);
//# sourceMappingURL=say-hello.js.map