import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkerJsonStore = {
  async getAllPlacemarkers() {
    await db.read();
    return db.data.placemarkers;
  },

  async addPlacemarker(categoryId, placemarker) {
    await db.read();
    placemarker._id = v4();
    placemarker.categoryid = categoryId;
    db.data.placemarkers.push(placemarker);
    await db.write();
    return placemarker;
  },

  async getPlacemarkerByCategoryId(id) {
    await db.read();
    return db.data.placemarkers.filter((placemarker) => placemarker.categoryid === id);
  },

  async getPlacemarkersById(id) {
    await db.read();
    return db.data.placemarkers.find((placemarker) => placemarker._id === id);
  },

  async deletePlacemarker(id) {
    await db.read();
    const index = db.data.placemarkers.findIndex((placemarker) => placemarker._id === id);
    db.data.placemarkers.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarkers() {
    db.data.placemarkers = [];
    await db.write();
  },

  async updatePlacemarkers(placemarker, updatedPlacemarker) {
    placemarker.title = updatedPlacemarker.title;
    placemarker.description = updatedPlacemarker.description;
    placemarker.lat = updatedPlacemarker.lat;
    placemarker.long = updatedPlacemarker.long;
    placemarker.difficulty = updatedPlacemarker.difficulty;
    await db.write();
  },
};
