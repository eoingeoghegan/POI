import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";

import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Joi from "joi";
import * as jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt-utils.js";
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



  
const result = dotenv.config();
console.log("ENV COOKIE_NAME:", process.env.COOKIE_NAME);
console.log("ENV COOKIE_PASSWORD:", process.env.COOKIE_PASSWORD);
console.log("ENV MONGO_URL:", process.env.MONGO_URL);
if (result.error) {
  console.log(result.error.message);
  // process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "Poi API",
    version: "0.1",
  },
};

// https://akhromieiev.com/tutorials/using-cors-in-hapi/#google_vignette 
// This allowed me to get the the Service working for adding a user from back to front end by adding routes +corss

async function init() {
  const server = Hapi.server({
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 4000,
    routes: {
      cors: {
        origin: ["http://localhost:5173", "https://poifront.netlify.app"], 
        credentials: true,                
      }
    }
  });
  
  await server.register(Cookie);
  await server.register(jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  
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
