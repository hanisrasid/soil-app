const db = require("../database");
const argon2 = require("argon2");

// Select all reviews from the database.
exports.all = async (req, res) => {
    const reviews = await db.review.findAll({
        include: [
            {
                model: db.user,
                attributes: ['id', 'fullName'],
                required: false
            },
            {
                model: db.item,
                attributes: ['id', 'name'],
                required: false
            }
        ]
    });

    res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
    try {
        if(req.body.itemID == 0) {
            const review = await db.review.create({
                userID: req.body.userID,
                comment: req.body.comment,
                stars: req.body.stars
            });

            res.json(review);
        }
        else {
            const review = await db.review.create({
                userID: req.body.userID,
                itemID: req.body.itemID,
                comment: req.body.comment,
                stars: req.body.stars
            });

            res.json(review);
        }
    }
    catch(error) {
        res.status(500).json({ error: error});
    }
};

// Update a review in the database.
exports.update = async (req, res) => {
    const data = {
        comment: req.body.comment,
        stars: req.body.stars
    };
    
    if (req.body.itemID !== 0) {
        data.itemID = req.body.itemID;
    }

    const review = await db.review.update(data, {
        where: { id: req.params.id }
    });

    res.json(review);
};

// Update a review in the database.
exports.delete = async (req, res) => {
    const review = await db.review.destroy({
        where: { id: req.params.id }
    });

    res.json(review);
};