import express from "express";
import bodyParser from "body-parser";
import { configureRoutes } from "./lib/core";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configureRoutes(app);

export default app;
