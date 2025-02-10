import { db } from "../models/db.js";

export const dashboardController = {
    index: {
      handler: function (request, h) {
        return h.view("dashboard-view", {title: "Dashboard"});
      },
    },
  };
  