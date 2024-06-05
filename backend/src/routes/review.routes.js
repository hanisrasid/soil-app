module.exports = (express, app) => {
    const controller = require("../controllers/review.controller.js");
    const router = express.Router();

    // Select all reviews.
    router.get("/", controller.all);

    // Create a new review.
    router.post("/", controller.create);

    // Update a new review.
    router.put("/:id", controller.update);

    // Delete a new review.
    router.delete("/:id", controller.delete);

    // Add routes to server.
    app.use("/api/review", router);
};
