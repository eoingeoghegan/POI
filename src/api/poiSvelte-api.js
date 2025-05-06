import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const poiSvelteApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkers = await db.placemarkerStore.find();
        return h.response(placemarkers).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByCategory: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarkers = await db.placemarkerStore.findByCategory(request.params.id);
      return h.response(placemarkers).code(200);
    },
  },

  makePlacemarker: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.findOne(request.params.id); // Corrected to fetch category
      if (category === null) {
        return Boom.notFound("No Category with this id");
      }

      const placemarkerPayload = request.payload;
      const placemarker = {
        description: placemarkerPayload.description,
        lat: placemarkerPayload.lat,
        long: placemarkerPayload.long,
        difficulty: placemarkerPayload.difficulty,
        category: category,
      };

      const newPlacemarker = await db.placemarkerStore.add(placemarker);
      return h.response(newPlacemarker).code(201); // Use 201 for successful creation
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("delete...");
      await db.placemarkerStore.delete();
      return h.response().code(204); // No Content for successful deletion
    },
  },
};
