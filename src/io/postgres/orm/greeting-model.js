"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// so all the ORM mapping stuff can be concealed behind a veil of
// sanity and nothing outside the postgres folder should ever import
// from the postgres orm folder.
class GreetingModel {
    findGreeting(extra) {
        return {
            basic: "Hello from ORM",
            extra
        };
    }
}
exports.GreetingModel = GreetingModel;
//# sourceMappingURL=greeting-model.js.map