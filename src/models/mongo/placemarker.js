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
    ref: "Placemarker",
  },
});

export const Placemarker = Mongoose.model("Placemarker", placemarkerSchema);
