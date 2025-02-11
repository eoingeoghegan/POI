import { db } from "../models/db.js";


export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const poiLists = await db.poiListStore.getAllPoiLists();
        const viewData= {
          title: "PlaceMarker Dashboard",
          poiLists: poiLists,
        };
        return h.view("dashboard-view", viewData);
      },
    },

    addPoiList: {
      handler: async function(request, h) {
        const newPoiList = {
          title: request.payload.title,
          lat: request.payload.lat,
          long: request.payload.long,
        };
        await db.poiListStore.addPoiList(newPoiList);
        return h.redirect("/dashboard");
      },
    },
  };
  