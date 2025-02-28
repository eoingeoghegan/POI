import {db} from "../models/db.js";


// the adminController renders the admin-view.
// The index is responsible for retrieving All users and allowing the attributes to be used.
// The deleteAdminUser gets the user by their Id number and allows for that user to be deleted by the Id given.
// The user is then redirected back to the admin page after pressing delete.
export const adminController ={

    adminIndex: {
        auth: false,
        handler: async function (request, h) {
            const users = await db.userStore.getAllUsers();
            console.log("Admin Users (On Page Load):", users);
            
            
            return h.view("admin-view", { 
                title: "User Details", 
                users: users,
        });
     },
  },

   deleteAdminUser:{
    auth: false,
    handler: async function(request, h) {
     const user = await db.userStore.getUserById(request.params.id)
     await db.userStore.deleteUserById(user._id)
     return h.redirect("/admin")
     
     }
   }

};