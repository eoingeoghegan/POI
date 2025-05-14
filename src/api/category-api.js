import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CategoryArraySpec, CategorySpec, CategorySpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const categoryApi = {
    find: {
        auth: {
          strategy: "jwt",
        },
        handler: async function (request, h) {
          try {
            const userId = request.auth.credentials.id;
            const categories = await db.categoryStore.getAllCategories(userId);
            return categories;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
        tags: ["api"],
        response: { schema: CategoryArraySpec, failAction: validationError },
        description: "Get all categories",
        notes: "Returns all categories",
      },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Find a Category",
    notes: "Returns a Category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Category",
    notes: "Returns the newly created Category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },


  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CategoryApi",
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category found with this id");
        }

        const file = request.payload.imagefile;
        if (!file || Object.keys(file).length === 0) {
          return Boom.badRequest("No file uploaded");
        }

        // Call the imageStore to upload the image
        const url = await imageStore.uploadImage(file);
        category.img = url;
        await db.categoryStore.updateCategoryList(category);

        return h.response(category).code(200);
      } catch (err) {
        console.error(err);
        return Boom.serverUnavailable("Error processing image upload");
      }
    },
    payload: {
      multipart: true,
      output: "data", // Get the raw data from the uploaded file
      maxBytes: 209715200, // Max file size (200MB)
      parse: true, // Automatically parse the incoming data
    },
    tags: ["api"],
    description: "Upload an image for the category",
    notes: "Returns the updated category with the image URL",
  },
};
