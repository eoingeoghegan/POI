import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";


// deletes the users from array, then adds users from testUsers.
suite("User API tests", () => {
  setup(async () => {
    await poiService.deleteAllUsers();
    
        for (let i = 0; i < testUsers.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          testUsers[i] = await poiService.createUser(testUsers[i]);
        }
    
    
  });
  teardown(async () => {
  });
 
  // created user Maggie and is given an Id number
  test("create a user", async () => {
    const newUser = await poiService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  // gets all the users and checks if = 3 which is should be. Then tdeletes all users and check if = 0 
  test("delete all users", async () => {
    let returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await poiService.deleteAllUsers();
    returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  // checks for testUser at index 0 and checks if it is returned.
  test("get a user - success", async () => {
    const returnedUser = await poiService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  // looks for user "1234", it checks if it null if user is not found and gives an error message.
  test("get a user - fail", async () => {
    try {
      const returnedUser = await poiService.getUser("1234");
      assert.isNull(returnedUser);
  } catch (error) {
    assert(error.response.data.message === "No User with this id");
  }
  });

});
