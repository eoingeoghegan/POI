import {db} from "../models/db.js";

export const userController= {
    index: {
        handler: async function (request, h) {
            const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);
            console.log("Logged-in User (On Page Load):", loggedInUser); // Logs user when page loads
            
            return h.view("user-view", { 
                title: "User Details", 
                user: loggedInUser 
            });
        },
    },

    updateUserDetails: {
        handler: async function(request, h) {
            
            const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);
            console.log(loggedInUser);
            
            const newUser = {
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                email: request.payload.email,
                password: request.payload.password,
            }
            await db.userStore.updateUser(loggedInUser, newUser);
            return h.redirect("/dashboard");

            
        }
    }
};
