import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController}  from "./controllers/about-controller.js";
import { categoryController} from "./controllers/category-controller.js";
import {userController} from "./controllers/user-controller.js";
import {adminController} from "./controllers/admin-controller.js";

export const webRoutes = [
// accountsController Routes
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup},
    { method: "GET", path: "/login", config: accountsController.showLogin},
    { method: "GET", path: "/logout", config: accountsController.logout},
    { method: "POST", path: "/register", config: accountsController.signup},
    { method: "POST", path: "/authenticate", config: accountsController.login},

// dashboardController Routes
    { method: "GET", path: "/dashboard", config: dashboardController.index},
    { method: "POST", path: "/dashboard/addCategory", config: dashboardController.addCategory},
    { method: "GET", path: "/dashboard/deleteCategory/{id}", config: dashboardController.deleteCategory},

// userController Routes
    { method: "GET", path: "/user", config: userController.index},
    { method: "POST", path: "/update", config: userController.updateUserDetails},
   
// aboutController Route
    { method: "GET", path: "/about", config: aboutController.index},

// CategoryController Routes
    { method: "GET", path: "/category/{id}", config: categoryController.index},
    { method: "POST", path: "/category/{id}/addPlacemarker", config: categoryController.addPlacemarker},
    { method: "GET", path: "/category/{id}/deletePlacemarker/{placemarkerid}", config: categoryController.deletePlacemarker},
    
    { method: "POST", path: "/category/{id}/uploadimage", config: categoryController.uploadImage },

// AdminController Routes
    { method: "GET", path: "/admin", config: adminController.adminIndex},
    { method: "GET", path: "/admin/deleteAdminUser/{id}", config: adminController.deleteAdminUser },
    

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

    
];


