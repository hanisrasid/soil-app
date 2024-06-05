module.exports = (express, app) => {
  const controller = require("../controllers/shoppingCart.controller.js");
  const router = express.Router();

  // Select a single cart with user id.
  router.get("/:id", controller.one);

  // Add routes to server.
  app.use("/api/shopping-cart", router);
};
