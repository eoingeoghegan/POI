import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController}  from "./controllers/about-controller.js";
import { poiListController} from "./controllers/poiList-controller.js";


export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup},
    { method: "GET", path: "/login", config: accountsController.showLogin},
    { method: "GET", path: "/logout", config: accountsController.logout},
    { method: "POST", path: "/register", config: accountsController.signup},
    { method: "POST", path: "/authenticate", config: accountsController.login},

    { method: "GET", path: "/dashboard", config: dashboardController.index},
    { method: "POST", path: "/dashboard/addPOI", config: dashboardController.addPoiList},
    { method: "GET", path: "/dashboard/deletePoiList/{id}", config: dashboardController.deletePoiList},

    

    { method: "GET", path: "/about", config: aboutController.index},

    { method: "GET", path: "/poiList/{id}", config: poiListController.index},
    


];


