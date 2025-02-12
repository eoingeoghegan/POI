import {db} from "../models/db.js";

export const categoryController={
    index: {
        handler: function(request,h) {
            return h.view("category-view", {title: "placemarker"});
        }
    }
};