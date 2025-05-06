/* This is the data store for the application 
 The different store options include JSON, mongo database and memory
 The init() function allows the application to pick which data storetype to be used  */



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
        this.categoryStore = categoryMemStore;
        this.placemarkerStore = placemarkerMemStore; 
      }
    },
};
