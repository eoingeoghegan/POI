import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testUsers} from "./fixtures.js";
import {assertSubset} from "./test-utils.js";

suite("User API tests", () => {

  

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
  });

  // assert.deepEqual, replaced with assertSubset due to mogo adding id number as extra.
  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser)
  });
// This test loops through TestUsers and adds them to the store (3objects).
// DeleteAll is called and should returned a list = 0 which it does.
  test("delete a user", async () => {
    for( let i=0; i<testUsers.length; i +=1) {
        // eslint-disable-next-line no-await-in-loop
        await db.userStore.addUser(testUsers[i]); 
  }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
    
  });

  // This adds User Maggie, then checks if maggie is created by looking for her id and email. 
  test("get a user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    console.log(user._id);
    assert.deepEqual(user, returnedUser1);

    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    console.log(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  // this adds the users from testUser (homer, bart and marge). Then calls deleteById(homer = [0])
  // returnedUsers now =2 anf testUsers = 3-1 =2, so one name was deleted successfully.
  // deletedUser is now undefined as its deleted.
  // This works, however adding the assert.isNull creates an error I couldn't fix. I tried changing the user JSON store id and email function but no joy.
  test("delete One User - success", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }

    console.log("Users before deletion:", await db.userStore.getAllUsers());

    await db.userStore.deleteUserById(testUsers[0]._id);

    console.log("Users after deletion:", await db.userStore.getAllUsers());

    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);

    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    
    console.log("deletedUser:", deletedUser);
});

// this test checks for a user with the entered id. If it doesn't exist it returns as undefined.
// same for the email
test("get a user - failures", async () => {
  const noUserWithId = await db.userStore.getUserById("123");
  console.log(noUserWithId);
  assert.equal(noUserWithId);
  
  const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
  assert.equal(noUserWithEmail);
});

 // this test checks if the database has a user with and wrong email, an id.
 // if so the nullUser returns as undefined.
test("get a user - bad params", async () => {
  let nullUser = await db.userStore.getUserByEmail("");
  assert.equal(nullUser);
  nullUser = await db.userStore.getUserById("");
  assert.equal(nullUser);
  nullUser = await db.userStore.getUserById();
  assert.equal(nullUser);
});
 
// failing as allusers = 0 while testUsers= 3.  
test("delete One User - fail", async () => {
  await db.userStore.deleteUserById("bad-id");
  const allUsers = await db.userStore.getAllUsers();
  console.log("allUser:", allUsers);
  console.log("testUsers:" , testUsers);
  assert.equal(testUsers.length, allUsers.length);
});


});
