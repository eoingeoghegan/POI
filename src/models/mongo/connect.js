/* dotenv is used to load environment variables from a .env file.
 Mongoose is used to interact with the MongoDB, including setting the connection and 
 handling connection errors, disconnections, and successful connections. */


import * as dotenv from "dotenv";
import Mongoose from "mongoose";

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}
