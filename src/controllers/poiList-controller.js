import {db} from "../models/db.js";

export const poiListController={
    index: {
        handler: function(request,h) {
            return h.view("placemarker-view", {title: "placemarker"});
        }
    }
};