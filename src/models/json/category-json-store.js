import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkerJsonStore } from "./placemarker-json-store.js";

// this reads the database for categories and returns all that are stored.
export const categoryJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },
//  This adds the category by reading the db and push(add) to the array and writes this to the db.
  async addCategory(category) {
    await db.read();
    category._id = v4();
    db.data.categories.push(category);
    await db.write();
    return category;
  },
// this reads the db, finds the category by its id. If its in the list it will be returned otherwise categories list = null.
  async getCategoryById(id) {
    await db.read();
    let list = db.data.categories.find((category) => category._id === id);
    if (list) {
      list.placemarkers = await placemarkerJsonStore.getPlacemarkerByCategoryId(list._id);
    } else {
      list = null;
    }
    return list;
  },
 // This reads the db, and filters the categories associated with the users id.
  async getUserCategories(userid) {
    await db.read();
    return db.data.categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((category) => category._id === id);
    if(index!== -1) db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },
};
