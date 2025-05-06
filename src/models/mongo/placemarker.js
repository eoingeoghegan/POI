/*  The placemarker Schema is the structure for documents in the Placemarker.
 categoryid: This  a Placemarker object, using its ObjectId.
 Placemarker is then created as a Mongoose model using the schema and exported for 
 use in other parts of the application. */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkerSchema = new Schema({
  title: String,
  description: String,
  lat: Number,
  long: Number,
  difficulty: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemarker = Mongoose.model("Placemarker", placemarkerSchema);
