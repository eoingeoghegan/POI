/*  The userSchema is the structure for documents in the user.
 user is then created as a Mongoose model using the schema and exported for 
 use in other parts of the application. */
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
