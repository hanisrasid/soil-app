const db = require("../database");
const argon2 = require("argon2");

// Select all cart items from the database.
exports.all = async (req, res) => {
    const cartItems = await db.cartItem.findAll();

    res.json(cartItems);
};

// Select one cart item from the database.
exports.one = async (req, res) => {
    const cartItem = await db.cartItem.findByPk(req.params.id);

    res.json(cartItem);
};

// Select one cart item based on shopping cart id from the database.
exports.oneFromCart = async (req, res) => {
    const cartItem = await db.cartItem.findOne({
        where: {
            cartID: req.params.cartID,
            itemID: req.params.itemID
        }
    });

    res.json(cartItem);
};

// Select all cart items based on shopping cart id from the database.
exports.allFromCart = async (req, res) => {
    const cartItems = await db.cartItem.findAll({
        where: {
            cartID: req.params.cartID
        },
        raw: true
    });
    res.send(cartItems);
};


// Create a cart item in the database.
exports.create = async (req, res) => {
    const cartItem = await db.cartItem.create({
        itemID: req.body.itemID,
        cartID: req.body.cartID,
        itemPrice: req.body.itemPrice,
        quantity: req.body.quantity
    });

    res.json(cartItem);
};

// Update a cart item in the database.
exports.update = async (req, res) => {
    const cartItem = await db.cartItem.update({quantity: req.body.quantity}, {
        where: { id: req.params.id }
    });

    res.json(cartItem);
};

// Delete a cart item in the database.
exports.delete = async (req,res) => {
    await db.cartItem.destroy({where: {cartID: req.body.cartID, itemID: req.body.itemID}})
    res.status(200).send({message: "Item removed from cart."})
}
// Increment quantity of cart item
exports.increment = async(req,res) => {
    const item = await db.cartItem.findOne({where:{itemID: req.body.itemID, cartID: req.body.cartID}})

    item.quantity += req.body.quantity;

    await item.save();
    
    return res.status(200).json({message:"Item successfully updated"})
}
