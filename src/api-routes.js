import {userApi} from "./api/user-api.js";
import {categoryApi} from "./api/category-api.js";
import {placemarkerApi} from"./api/placemarker-api.js";
import { poiSvelteApi } from "./api/poiSvelte-api.js";

// the routes for posting, deleting and retrieving users by API.
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
   

    { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/placemarkers", config: placemarkerApi.find },
  { method: "GET", path: "/api/placemarkers/{id}", config: placemarkerApi.findOne },
  { method: "POST", path: "/api/categories/{id}/placemarkers", config: placemarkerApi.create },
  { method: "DELETE", path: "/api/placemarkers", config: placemarkerApi.deleteAll },
  { method: "DELETE", path: "/api/placemarkers/{id}", config: placemarkerApi.deleteOne },

 /* { method: "GET", path: "/api/placemarkers", config: poiSvelteApi.findAll },
  { method: "GET" , path: "/api/categories/{id}/placemarkers", config: poiSvelteApi.findByCategory },
  { method: "POST" , path: "/api/categories/{id}/placemarkers", config: poiSvelteApi.makePlacemarker },
  { method: "DELETE" , path: "/api/placemarkers", config: poiSvelteApi.deleteAll },  */
  
  ];

  