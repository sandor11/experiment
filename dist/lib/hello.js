"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Greeter {
    constructor(extra) {
        this.extra = extra;
        this.basic = "yolo!";
    }
    talk() {
        return [this.extra, this.basic].join(", ");
    }
}
exports.Greeter = Greeter;
//# sourceMappingURL=hello.js.map