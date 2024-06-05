module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // Select all users.
    router.get("/", controller.all);

    // Select a single user with id.
    router.get("/:id", controller.one);

    // Select one user from the database if username and password are a match.
    router.post("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update a user
  router.put("/update", controller.edit);

  // Delete a user
  router.delete("/:id", controller.delete);

    // Add routes to server.
    app.use("/api/user", router);
};
