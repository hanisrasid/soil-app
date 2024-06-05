const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add routes.
require("./src/routes/cartItem.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/shoppingCart.routes.js")(express, app);
require("./src/routes/item.routes.js")(express, app);
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
