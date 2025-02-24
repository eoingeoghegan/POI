import { v4 } from "uuid";

let placemarkers = [];

export const placemarkerMemStore = {
  async getAllPlacemarkers() {
    return placemarkers;
  },

  async addPlacemarker(categoryId, placemarker) {
    placemarker._id = v4();
    placemarker.categoryId = categoryId;
    placemarkers.push(placemarker);
    return placemarker;
  },

  async getPlacemarkersByCategoryId(id) {
    return placemarkers.filter((placemarker) => placemarker.categoryId === id);
  },

  async getpPlacemarkerById(id) {

    let foundPlacemarker = placemarkers.find((placemarker) => placemarker._id === id);
    if (!foundPlacemarker) {
      foundPlacemarker = null;
    }
    return foundPlacemarker;
  },

  async getCategoryPlacemarkers(categoryId) {
    let foundPlacemarkers = placemarkers.filter((placemarker) => placemarker.categoryid === categoryId);
    if (!foundPlacemarkers) {
      foundPlacemarkers = null;
    }
    return foundPlacemarkers;
  },

  async deletePlacemarker(id) {
    const index = placemarkers.findIndex((placemarker) => placemarker._id === id);
    if(index !== -1) placemarkers.splice(index, 1);
  },

  async deleteAllPlacemarkers() {
    placemarkers = [];
  },

  async updatePlacemarkers(placemarker, updatedPlacemarker) {
    placemarker.title = updatedPlacemarker.title;
    placemarker.description = updatedPlacemarker.description;
    placemarker.lat = updatedPlacemarker.lat;
    placemarker.long = updatedPlacemarker.long;
    placemarker.difficulty = updatedPlacemarker.difficulty;
  },
};
