import { v4 } from "uuid";
import { db } from "./store-utils.js";

// reads the json db and returns all the placemarkers available.
export const placemarkerJsonStore = {
  async getAllPlacemarkers() {
    await db.read();
    return db.data.placemarkers;
  },

  // adds the placemarker to category by id, reads the db, adds the placemarker to this category and returnes the placemarker.
  async addPlacemarker(categoryId, placemarker) {
    await db.read();
    placemarker._id = v4();
    placemarker.categoryid = categoryId;
    db.data.placemarkers.push(placemarker);
    await db.write();
    return placemarker;
  },

  // reads the db, filters through placemarkers associated by its category id. Returns any plaemarkers if available.
  async getPlacemarkerByCategoryId(id) {
    await db.read();
    let foundPlacemarkers = db.data.placemarkers.filter((placemarker) => placemarker.categoryid === id);
    if (!foundPlacemarkers) {
      foundPlacemarkers = null;
    }
    return foundPlacemarkers;
  },

  // similar to above byt finds a placmarker by placemarker id instead of categoryid
  async getPlacemarkersById(id) {
    await db.read();
    let foundPlacemarker = db.data.placemarkers.find((placemarker) => placemarker._id === id);
    if (!foundPlacemarker) {
      foundPlacemarker = null;
    }
    return foundPlacemarker;
  },

  async getCategoryPlacemarkers(categoryId) {
    await db.read();
    let foundPlacemarkers = placemarkers.filter((placemarker) => placemarker.categoryid === categoryId);
    if (!foundPlacemarkers) {
      foundPlacemarkers = null;
    }
    return foundPlacemarkers;
  },

  async deletePlacemarker(id) {
    await db.read();
    const index = db.data.placemarkers.findIndex((placemarker) => placemarker._id === id);
    if(index !== -1) db.data.placemarkers.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarkers() {
    db.data.placemarkers = [];
    await db.write();
  },
 
  /* updates placemarker by changing the previous info from title to the new info entered into title.. and so on.
   it the saves this to the db. */
  async updatePlacemarkers(placemarker, updatedPlacemarker) {
    placemarker.title = updatedPlacemarker.title;
    placemarker.description = updatedPlacemarker.description;
    placemarker.lat = updatedPlacemarker.lat;
    placemarker.long = updatedPlacemarker.long;
    placemarker.difficulty = updatedPlacemarker.difficulty;
    await db.write();
  },
};
