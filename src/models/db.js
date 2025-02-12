import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore} from "./mem/category-mem-store.js";
import { placemarkerMemStore} from "./mem/placemarker-mem-store.js";


export const db = {
  userStore: null,
  categoryStore: null,
  placemarkerStore: null,
  

  init() {
    this.userStore = userMemStore;
    this.categoryStore= categoryMemStore;
    this.placemarkerStore = placemarkerMemStore;
  },
};
