"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const configure_1 = require("./io/express/configure");
// Create Express server
const server = express_1.default();
// Express configuration
server.set("port", process.env.PORT || 3000);
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
configure_1.configure(server);
/**
 * Error Handler. Provides full stack - remove for production
 */
server.use(errorhandler_1.default());
/**
 * Start Express server.
 */
server.listen(server.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", server.get("port"), server.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
//# sourceMappingURL=server.js.map