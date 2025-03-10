// This controller handles the about-view. 

export const aboutController = {
    index: {
        handler: function(request, h) {
            return h.view("about-view", {title: "About"});
        }
    }
};