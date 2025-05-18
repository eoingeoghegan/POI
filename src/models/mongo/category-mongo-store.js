import Mongoose from "mongoose";
import { Category } from "./category.js";
import { placemarkerMongoStore } from "./placemarker-mongo-store.js";

 // Gets all categories from the database, .lean() to get plain JavaScript objects instead of Mongoose docs
export const categoryMongoStore = {
  async getAllCategories(userId) {
  const categories = await Category.find({ userid: userId }).lean();
  return categories;
},

  // gets a category by its ID and populate placemarker data for that category, then checks if the ID is valid
  //  If category exists, gets the placemarkers associated with the category
  async getCategoryById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarkers = await placemarkerMongoStore.getPlacemarkersByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },
// Add a new category to the database, creates a new Category document, saves to the new category to the database
// then returns the category after saving (including placemarkers)
  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },
// gets all categories belonging to a specific user and finds the categories by user ID
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
  },

  // function for updating an image
  async updateCategoryList(updatedCategory) {
    const category = await Category.findOne({ _id: updatedCategory._id });
    category.title = updatedCategory.title;
    category.img = updatedCategory.img;
    await category.save();
  },
};
