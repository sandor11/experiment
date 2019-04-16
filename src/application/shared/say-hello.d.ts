import { Command, Success, Handler } from "../structure";
import { FindGreeting } from "../../domain/greeting";
export declare type SayHello = Command & {
    speech: string;
    other: number;
};
export declare type Hello = Success & {
    hello: string;
};
export declare const sayHelloHandler: (find: FindGreeting) => Handler<{
    speech: string;
    other: number;
}, {
    hello: string;
}>;
//# sourceMappingURL=say-hello.d.ts.map