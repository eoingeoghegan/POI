import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore} from "./mem/category-mem-store.js";
import { placemarkerMemStore} from "./mem/placemarker-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { placemarkerJsonStore } from "./json/placemarker-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { placemarkerMongoStore } from "./mongo/placemarker-mongo-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  placemarkerStore: null,
  

  init(storeType) {
    switch (storeType) {
      case "json":
    
        this.userStore = userJsonStore;
        this.categoryStore= categoryJsonStore;
        this.placemarkerStore = placemarkerJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.categoryStore= categoryMongoStore;
        this.placemarkerStore = placemarkerMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.categorytore = categoryMemStore;
        this.placemarkerStore = placemarkerMemStore; 
      }
    },
};
