// import { userMemStore } from "./mem/user-mem-store.js";
// import { categoryMemStore} from "./mem/category-mem-store.js";
// import { placemarkerMemStore} from "./mem/placemarker-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { placemarkerJsonStore } from "./json/placemarker-json-store.js";


export const db = {
  userStore: null,
  categoryStore: null,
  placemarkerStore: null,
  

  init() {
    this.userStore = userJsonStore;
    this.categoryStore= categoryJsonStore;
    this.placemarkerStore = placemarkerJsonStore;
  },
};
