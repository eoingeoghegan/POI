import { v4 } from "uuid";
import { placemarkerMemStore } from "./placemarker-mem-store.js";



let categories = [];

export const categoryMemStore= {
 async getAllCategories() {
     return categories;
   },
 
   async addCategory(category) {
    category._id = v4();
    categories.push(category);
     return category;
   },

   async getUserCategories(userid) {
    return categories.filter((category) => category.userid === userid);
  },

 
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
