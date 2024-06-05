module.exports = (express, app) => {
    const controller = require("../controllers/item.controller.js");
    const router = express.Router();

    // Select all items.
    router.get("/", controller.all);
    
    // Select a single item with id.
    router.get("/:id", controller.one);

    // Create a new item.
    router.post("/", controller.create);

    // Update an item.
    router.put("/:itemId", controller.decrementStock);

    router.put("/:itemID/increment", controller.incrementStock);

    // Add routes to server.
    app.use("/api/item", router);
};
