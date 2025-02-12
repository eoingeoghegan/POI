import {db} from "../models/db.js";
import { PlacemarkerSpec } from "../models/joi-schemas.js";


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
        validate: {
          payload: PlacemarkerSpec,
          options: { abortEarly: false },
          failAction: function (request, h, error) {
            return h.view("category-view", { title: "Add placemarker error", errors: error.details }).takeover().code(400);
          },
        },
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

        deletePlacemarker:{
          handler: async function(request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            await db.placemarkerStore.deletePlacemarker(request.params.placemarkerid);
            return h.redirect(`/category/${category._id}`);
          },
        },
      };
