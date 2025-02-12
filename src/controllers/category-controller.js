import {db} from "../models/db.js";


export const categoryController={
    index: {
        handler: async function (request, h) {
          const category = await db.categoryStore.getCategoryById(request.params.id);
          const viewData = {
            title: "Category",
            category: category,
          };
          return h.view("category-view", viewData);
        },
      },

    
      addPlacemarker: {
        handler: async function (request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            const newPlacemarker = {
              title: request.payload.title,
              description: request.payload.description,
              lat: request.payload.lat,
              long: request.payload.long,
              difficulty: request.payload.difficulty,
            };
            await db.placemarkerStore.addPlacemarker(category._id, newPlacemarker);
            return h.redirect(`/category/${category._id}`);
          },
        },
      };
