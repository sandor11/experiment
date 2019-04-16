"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greeting_model_1 = require("./orm/greeting-model");
// lets pretent we needed to do some IO here and
// lookup a greeting based on some extra value here
exports.findGreeting = extra => new greeting_model_1.GreetingModel().findGreeting(extra);
//# sourceMappingURL=greeting.js.map