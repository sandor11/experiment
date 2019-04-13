import errorHandler from "errorhandler";
import express from "express";
import bodyParser from "body-parser";

import { configure } from "./io/express/configure";

// Create Express server
const server = express();

// Express configuration
server.set("port", process.env.PORT || 3000);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

configure(server);

/**
 * Error Handler. Provides full stack - remove for production
 */
server.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(server.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    server.get("port"),
    server.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
