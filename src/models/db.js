import { userMemStore } from "./mem/user-mem-store.js";
import { poiListMemStore} from "./mem/poiList-mem-store.js";


export const db = {
  userStore: null,
  poiListStore: null,
  

  init() {
    this.userStore = userMemStore;
    this.poiListStore= poiListMemStore;
  },
};
