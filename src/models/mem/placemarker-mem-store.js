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
    return placemarkers.find((placemarker) => placemarker._id === id);
  },

  async getCategoryPlacemarkers(categoryId) {
    return placemarkers.filter((placemarker) => placemarker.categoryId === categoryId);
  },

  async deletePlacemarker(id) {
    const index = placemarkers.findIndex((placemarker) => placemarker._id === id);
    placemarkers.splice(index, 1);
  },

  async deleteAllPlacemarkers() {
    placemarkers = [];
  },

  async updatePlacemarkers(placemarker, updatedPlacemarker) {
    placemarker.title = updatedPlacemarker.title;
    placemarker.description = updatedPlacemarker.description;
    placemarkers.lat = updatedPlacemarker.lat;
    placemarkers.long = updatedPlacemarker.long;
    placemarkers.difficulty = updatedPlacemarker.difficulty;
  },
};
