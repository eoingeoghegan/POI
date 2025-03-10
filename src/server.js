import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Joi from "joi";
import { webRoutes } from "./web-routes.js";
import {apiRoutes} from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

/*  The code sets up an Hapi.js server on localhost:4000, with plugins for cookie-based authentication, 
templating using Handlebars, and view rendering using the vision plugin.
Authentication: Uses a cookie-based session authentication , where session details are validated by accountsController.validate.
Environment Variables: Loads environment variables from a .env file using dotenv.
Database: Initializes MongoDB using the db.init("mongo") call.
Routes: Registers both web and API routes, and then starts the server, logging the URI where it is running.
Error Handling: Handles unhandled promise rejections by logging them and exiting the process. */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 4000,
    host: "localhost",
  });
  await server.register(Vision);
  await server.register(Cookie);
  server.validator(Joi);
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}


  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");


  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
