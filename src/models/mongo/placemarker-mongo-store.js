import Mongoose from "mongoose";
import { Placemarker } from "./placemarker.js";


export const placemarkerMongoStore = {
  async getAllPlacemarkers() {
    const placemarkers = await Placemarker.find().populate("categoryid").lean();
    return placemarkers;
  },

  async addPlacemarker(categoryId, placemarker) {
    placemarker.categoryid = categoryId;
    const newPlacemarker = new Placemarker(placemarker);
    const placemarkerObj = await newPlacemarker.save();
    
    console.log("Saved placemarker:", placemarkerObj);
    
    return this.getPlacemarkerById(placemarkerObj._id);    
  },

  

  async getPlacemarkersByCategoryId(id) {
    const placemarkers = await Placemarker.find({ categoryid: id }).populate("categoryid").lean();
    return placemarkers;
  },

  async getPlacemarkerById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const placemarker = await Placemarker.findOne({ _id: id }).lean();
      return placemarker;
    }
    return null;
  },

  async deletePlacemarker(id) {
    try {
      await Placemarker.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarkers() {
    await Placemarker.deleteMany({});
  },

  

  async updatePlacemarker(placemarker, updatedPlacemarker) {
    const placemarkerDoc = await Placemarker.findOne({ _id: placemarker._id });
    placemarkerDoc.title = updatedPlacemarker.title;
    placemarkerDoc.artist = updatedPlacemarker.description;
    placemarkerDoc.lat = updatedPlacemarker.lat;
    placemarkerDoc.long = updatedPlacemarker.long;
    placemarkerDoc.difficulty = updatedPlacemarker.difficulty;
    await placemarkerDoc.save();
  },
};

