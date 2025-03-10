import {assert} from "chai";
import { db} from "../../src/models/db.js";
import { walks, testCategories} from "../fixtures.js"
import {assertSubset} from "../test-utils.js";

suite("Category API test", async () =>{
// imported { walks, testCategories} from "./fixture.js" 
    
    setup( async () =>{
        db.init("mongo");
        // start with an empty []
        await db.categoryStore.deleteAllCategories();
        
    });

    // creates the category 'walks' and checks if it is created.

    test("create a category", async () =>{
     const category = await db.categoryStore.addCategory(walks);
     assertSubset(walks, category);
     assert.isDefined(category._id);
    });

    // adds the categories to [], calls delete all function and checks if all categories are deleted.
     test("delete a Category", async () => {
        for( let i=0; i<testCategories.length; i +=1) {
            // eslint-disable-next-line no-await-in-loop
            await db.categoryStore.addCategory(testCategories[i]); 
      }
      let arrayCategories = await db.categoryStore.getAllCategories();
      assert.equal(arrayCategories.length, 3);
      await db.categoryStore.deleteAllCategories();
      arrayCategories = await db.categoryStore.getAllCategories();
      assert.equal(arrayCategories.length, 0);
      });

     
    
      // adds walks to [] and checks if the id for walks is created.
      test("get a category - success", async () =>{
        const category = await db.categoryStore.addCategory(walks);
        const returnedCategory = await db.categoryStore.getCategoryById(category._id);
        assertSubset(walks, category);
      });

    /* adds 3 catergories to [], picks out category at index 0 and removes it by its id number. 
    then checks if array has one less in it. */
      test("delete one category -success", async () => {
        for (let i =0; i < testCategories.length; i+=1) {
            // eslint-disable-next-line no-await-in-loop
            await db.categoryStore.addCategory(testCategories[i]);
        }
        const id = testCategories[0]._id;
        console.log(id);
        await db.categoryStore.deleteCategoryById(id);
        const returnedCategories = await db.categoryStore.getAllCategories();
        console.log(returnedCategories);
        assertSubset(returnedCategories.length, testCategories.length -1);
      });

      test("get a Category - bad params", async () => {
        assert.isNull(await db.categoryStore.getCategoryById(""));
        assert.isNull(await db.categoryStore.getCategoryById());
      });
    
      test("delete One category - fail", async () => {
        await db.categoryStore.deleteCategoryById("bad-id");
        const allCategories = await db.categoryStore.getAllCategories();
        console.log("allCategories:", allCategories);
        console.log("testCat:" , testCategories);
        assert.equal(testCategories.length, allCategories.length);
      });
    });
