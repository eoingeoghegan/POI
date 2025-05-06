import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlacemarkerSpec, PlacemarkerSpecPlus, PlacemarkerArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const placemarkerApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
        return placemarkers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkerArraySpec, failAction: validationError },
    description: "Get all PlacemarkerApi",
    notes: "Returns all PlacemarkerApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemarker = await db.placemarkerStore.getPlacemarkerById(request.params.id);
        if (!placemarker) {
          return Boom.notFound("No placemarker with this id");
        }
        return placemarker;
      } catch (err) {
        return Boom.serverUnavailable("No placemarker with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placemarker",
    notes: "Returns a placemarker",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkerSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {

        const category = await db.categoryStore.getCategoryById(request.params.id);
      if (!category) {
        return Boom.notFound("No category with this id");
      }
      
        const placemarker = await db.placemarkerStore.addPlacemarker(request.params.id, request.payload);
        if (placemarker) {
          return h.response(placemarker).code(201);
        }
        return Boom.badImplementation("error creating placemarker");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Placemarker",
    notes: "Returns the newly created placemarker",
    validate: { payload: PlacemarkerSpec },
    response: { schema: PlacemarkerSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkerStore.deleteAllPlacemarkers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkerApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarker = await db.placemarkerStore.getPlacemarkerById(request.params.id);
        if (!placemarker) {
          return Boom.notFound("No placemarker with this id");
        }
        await db.placemarkerStore.deletePlacemarker(placemarker._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No placemarker with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemarker",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
