module.exports = (express, app) => {
    const controller = require("../controllers/cartItem.controller.js");
    const router = express.Router();

    // Select a single cart item with id.
    router.get("/:id", controller.one);

    // Create a new cart item.
    router.post("/", controller.create);

    // Select a single cart item with shopping cart id.
    router.get("/shopping-cart/:cartID/:itemID", controller.oneFromCart);

    // Select all cart items from shopping cart id.
    router.get("/shopping-cart/:cartID", controller.allFromCart);

    // Update a single cart item with id.
    router.put("/:id", controller.update);
    
    // Delete a cart item
    router.delete("/shopping-cart/delete", controller.delete);

    router.put("/:itemID/increment", controller.increment);
    
    // Add routes to server.
    app.use("/api/cart-item", router);


};
