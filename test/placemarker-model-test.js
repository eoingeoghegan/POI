import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCategories, testPlacemarkers, walks, ravensPoint, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Placemarker Model tests", () => {

  let walkList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkerStore.deleteAllPlacemarkers();
    walkList = await db.categoryStore.addCategory(walks);
    for (let i = 0; i < testPlacemarkers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarkers[i] = await db.placemarkerStore.addPlacemarker(walkList._id, testPlacemarkers[i]);
    }
  });

  test("create single placemarker", async () => {
    const walkList1 = await db.categoryStore.addCategory(walks);
    const placemarker = await db.placemarkerStore.addPlacemarker(walkList1._id, ravensPoint)
    assert.isNotNull(placemarker._id);
    assertSubset (ravensPoint, placemarker);
  });

  test("get multiple placemarkers", async () => {
    const placemarkers = await db.placemarkerStore.getPlacemarkersByCategoryId(walkList._id);
    assert.equal(placemarkers.length, testPlacemarkers.length)
  });

  test("delete all placemarkers", async () => {
    const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(testPlacemarkers.length, placemarkers.length);
    await db.placemarkerStore.deleteAllPlacemarkers();
    const newPlacemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(0, newPlacemarkers.length);
  });

  test("get a placemarker - success", async () => {
    const walkList1 = await db.categoryStore.addCategory(walks);
    const placemarker = await db.placemarkerStore.addPlacemarker(walkList1._id, ravensPoint)
    const newPlacemarker = await db.placemarkerStore.getPlacemarkerById(placemarker._id);
    assertSubset (ravensPoint, newPlacemarker);
  });

  test("delete One placemarker - success", async () => {
    await db.placemarkerStore.deletePlacemarker(testPlacemarkers[0]._id);
    const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(placemarkers.length, testCategories.length - 1);
    const deletedPlacemarker = await db.placemarkerStore.getPlacemarkerById(testPlacemarkers[0]._id);
    assert.isNull(deletedPlacemarker);
  });

  test("get a placemarker - bad params", async () => {
    assert.isNull(await db.placemarkerStore.getPlacemarkerById(""));
    assert.isNull(await db.placemarkerStore.getPlacemarkerById());
  });

  test("delete one placemarker - fail", async () => {
    await db.placemarkerStore.deletePlacemarker("bad-id");
    const placemarkers = await db.placemarkerStore.getAllPlacemarkers();
    assert.equal(placemarkers.length, testCategories.length);
  });
});
