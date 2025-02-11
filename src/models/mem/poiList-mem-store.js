import { v4 } from "uuid";



let poiLists = [];

export const poiListMemStore= {
 async getAllPoiLists() {
     return poiLists;
   },
 
   async addPoiList(poiList) {
     poiList._id = v4();
     poiLists.push(poiList);
     return poiList;
   },
 
   async getPoiListById(id) {
     return poiLists.find((poiList) => poiList._id === id);
   },
 
   async deletePoiListById(id) {
     const index = poiLists.findIndex((poiList) => poiList._id === id);
     poiLists.splice(index, 1);
   },
 
   async deleteAll() {
     poiLists = [];
   },
 };   
