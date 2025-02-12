import { db } from "../models/db.js";


export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const categories = await db.categoryStore.getAllCategories();
        const viewData= {
          title: "PlaceMarker Dashboard",
          categories: categories,
        };
        return h.view("dashboard-view", viewData);
      },
    },

    addCategory: {
      handler: async function(request, h) {
        const newCategory = {
          title: request.payload.title,
        };
        await db.categoryStore.addCategory(newCategory);
        return h.redirect("/dashboard");
      },
    },

    deleteCategory: {
      handler: async function(request, h){
        const category = await db.categoryStore.getCategoryById(request.params.id)
        await db.categoryStore.deleteCategoryById(category._id)
      return h.redirect("/dashboard")
        },
      },
    };
  
  