const db = require("../database");
const argon2 = require("argon2");

// Select one cart from the database.
exports.one = async (req, res) => {
    const shoppingCart = await db.shoppingCart.findOne({
        where: {
            UserId: req.params.id
        }
    });
    if (!shoppingCart) {
        res.status(404).json({ error: "ShoppingCart not found" });
    }
    else {
        res.json(shoppingCart);
    }
};

// Create a cart in the database.
exports.create = async (req, res) => {
    const shoppingCart = await db.shoppingCart.create({
        userID: req.body.userID
    });

    res.json(shoppingCart);
};
