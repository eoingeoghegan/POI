import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";

// This allows the user to view the categories associated with the logged in user by requesting the credntials.
export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials
        const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const viewData= {
          title: "PlaceMarker Dashboard",
          user: loggedInUser,
          categories: categories,
        };
        return h.view("dashboard-view", viewData);
      },
    },
   /* This retrieves the logged in user, and requests the title entered by a form. The user submits this and is redirected 
    to the dashboard with the new category showing. 
    Its checking for validation to ensure its filled in correctly. */
    addCategory: {
      validate: {
        payload: CategorySpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dashboard-view", { title: "Add category error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function(request, h) {
        const loggedInUser = request.auth.credentials;
        const newCategory = {
          userid: loggedInUser._id,
          title: request.payload.title,
        };
        await db.categoryStore.addCategory(newCategory);
        return h.redirect("/dashboard");
      },
    },

    /* delete category requests the category by id, checks the categorystore delete function and removes it by its id.
    user is then redirected to dashboard. */
    deleteCategory: {
      handler: async function(request, h){
        const category = await db.categoryStore.getCategoryById(request.params.id)
        await db.categoryStore.deleteCategoryById(category._id)
      return h.redirect("/dashboard")
        },
      },
    };
  
  