import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController}  from "./controllers/about-controller.js";
import { categoryController} from "./controllers/category-controller.js";
import {userController} from "./controllers/user-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup},
    { method: "GET", path: "/login", config: accountsController.showLogin},
    { method: "GET", path: "/logout", config: accountsController.logout},
    { method: "POST", path: "/register", config: accountsController.signup},
    { method: "POST", path: "/authenticate", config: accountsController.login},

    { method: "GET", path: "/dashboard", config: dashboardController.index},
    { method: "POST", path: "/dashboard/addCategory", config: dashboardController.addCategory},
    { method: "GET", path: "/dashboard/deleteCategory/{id}", config: dashboardController.deleteCategory},

    { method: "GET", path: "/user", config: userController.index},
    { method: "POST", path: "/update", config: userController.updateUserDetails},

    { method: "GET", path: "/about", config: aboutController.index},

    { method: "GET", path: "/category/{id}", config: categoryController.index},
    { method: "POST", path: "/category/{id}/addPlacemarker", config: categoryController.addPlacemarker},
    { method: "GET", path: "/category/{id}/deletePlacemarker/{placemarkerid}", config: categoryController.deletePlacemarker},
    
    


    
    


];


