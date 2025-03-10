import { v4 } from "uuid";
import { placemarkerMemStore } from "./placemarker-mem-store.js";

// this starts off by allowing the array to be empty []

let categories = [];

// this checksthe categories for entries and returns all that are stored.
export const categoryMemStore= {
 async getAllCategories() {
     return categories;
   },
 
   // adds category to categories with an random id.
   async addCategory(category) {
    category._id = v4();
    categories.push(category);
     return category;
   },

   // filters through categories for category by its user id
   async getUserCategories(userid) {
    return categories.filter((category) => category.userid === userid);
  },

 // finds category by id
   async getCategoryById(id) {
    const list = categories.find((category) => category._id === id);
    list.placemarkers = await placemarkerMemStore.getPlacemarkersByCategoryId(list._id);
    return list;
  },
 
   async deleteCategoryById(id) {
     const index = categories.findIndex((category) => category._id === id);
     categories.splice(index, 1);
   },
 
   async deleteAll() {
    categories = [];
   },
 };   
