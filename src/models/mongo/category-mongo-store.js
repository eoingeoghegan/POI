import Mongoose from "mongoose";
import { Category } from "./category.js";
import { placemarkerMongoStore } from "./placemarker-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCtegoryById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.tracks = await placemarkerMongoStore.getPlacemarkersByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  }
};
