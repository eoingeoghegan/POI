import {db} from "../models/db.js";
import { PlacemarkerSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

// The index requests the category by the id given in the categegory store and allows it to be viewed on the category-view.hbs
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

    /* for adding the placemarker it requests the category by id and will then allow a placemarker to be added to this category.
     the newPlacemarker is requesting the information provided by the user from the form.
     Once this is done it checks the placemarker store and uses the add Placemarker function to this category by id.
     It then redirects to /category with the category id added.
     The function is checking for validation to make sure the form is filled correctly. */
      addPlacemarker: {
        validate: {
          payload: PlacemarkerSpec,
          options: { abortEarly: false },
          failAction: function (request, h, error) {
            return h.view("category-view", { 
              title: "Add placemarker error", 
              errors: error.details,
              payload: request.payload
             }).takeover().code(400);
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
              categoryid: category._id,
            };
            
            await db.placemarkerStore.addPlacemarker(category._id, newPlacemarker);
            
            return h.redirect(`/category/${category._id}`);
            
          },
        },


      /* The delete placemarker requests the category by id, chekcs the placemarkerstore delete function
       and deltees the placemarker by requesting its id. The delete placemarker function is used to removes the placemarker. */
        deletePlacemarker:{
          handler: async function(request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            await db.placemarkerStore.deletePlacemarker(request.params.placemarkerid);
            return h.redirect(`/category/${category._id}`);
          },
        },


        /* 
        uploadImage works by  getting a multipart form with the image, it then gets the
        category by id, checks if the file was uploaded and uploads to cloudinary image store.
      The img field in category returns the image URL.
        */

        uploadImage: {
          handler: async function (request, h) {
            try {
              const category = await db.categoryStore.getCategoryById(request.params.id);
              const file = request.payload.imagefile;
              if (Object.keys(file).length > 0) {
                const url = await imageStore.uploadImage(request.payload.imagefile);
                category.img = url;
                await db.categoryStore.updateCategoryList(category);
              }
              return h.redirect(`/category/${category._id}`);
            } catch (err) {
              console.log(err);
              return h.redirect(`/category/${category._id}`);
            }
          },
          payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
          },
        },
      };
