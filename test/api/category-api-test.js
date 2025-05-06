import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, walks, testCategories } from "../fixtures.js";



EventEmitter.setMaxListeners(25);



   
suite("Playlist API tests", () => {

   let user = null;
    
   setup(async () => {
        await poiService.deleteAllCategories();
        await poiService.deleteAllUsers();
        user = await poiService.createUser(maggie);
        walks.userid = user._id;
      });
     
    

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await poiService.createCategory(walks);
    assert.isNotNull(returnedCategory);
    assertSubset(walks, returnedCategory);
  });


  test("delete a category", async () => {
    const category = await poiService.createCategory(walks);
    const response = await poiService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await poiService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
        testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPlaylist(testCategories[i]);
    }
    let returnedLists = await poiService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await poiService.deleteAllCategories();
    returnedLists = await poiService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await poiService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
