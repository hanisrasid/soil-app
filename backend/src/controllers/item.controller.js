const db = require("../database");
const argon2 = require("argon2");

// Select all items from the database.
exports.all = async (req, res) => {
    const items = await db.item.findAll({raw: true});
    res.json(items);
};

// Select one item from the database.
exports.one = async (req, res) => {
  const item = await db.item.findByPk(req.params.id);

  res.json(item);
};

// Create a item in the database.
exports.create = async (req, res) => {
    try {
        const item = await db.item.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc,
            stockCount: req.body.quantity,
            specialDay: req.body.specialDay,
            img: req.body.img
        });

        res.json(item);
    }
    catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.decrementStock = async (req, res) => {

    const item = await db.item.findByPk(req.params.itemId)

    item.stockCount -= 1;
    await item.save();
    
    return res.status(200).json({message:"Item successfully updated"})
}
exports.incrementStock = async (req, res) => {
    const item = await db.item.findByPk(req.body.itemID)
    
    item.stockCount += -req.body.quantity;

    await item.save();
    
    return res.status(200).json({message:"Item successfully updated"})
}
