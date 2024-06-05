const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

db.sequelize.authenticate().then(()=>{
    console.log("Connection to DB successful!")
}).catch((err)=>{
    console.log("Error connecting to database: ", err)   
})

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.shoppingCart = require("./models/shoppingCart.js")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem.js")(db.sequelize, DataTypes);
db.follower = require("./models/follower.js")(db.sequelize, DataTypes);
db.item = require("./models/item.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);


// // Relate post and user.
// db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync({alter: true})
    seedData();
};

async function seedData() {
    const userCount = await db.user.count();

    // Only seed data if necessary.
    if(userCount == 0) {
        const argon2 = require("argon2");

        let hash = await argon2.hash("Test123", { type: argon2.argon2id });
        await db.user.create({ email: "test@123.com", password: hash, isAdmin:0, fullName: "Hanis"});

        hash = await argon2.hash("Test123", { type: argon2.argon2id });
        await db.user.create({ email: "hello@world.com", password: hash, isAdmin:1, fullName: "Finau"});
    }

    const itemCount = await db.item.count();

    if(itemCount == 0) {
        const items = [{
            id: 1,
            name: "Organic Apples",
            description: "Grown without synthetic pesticides or fertilizers, organic apples are naturally sweet and crunchy, making them a healthy and delicious snack option.",
            img: "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 2,
            stockCount: 56,
            price: 32.56
        },
        {
            id: 2,
            name: "Organic Spinach",
            description: "Packed with vitamins and minerals, organic spinach is grown without harmful chemicals, making it a nutritious addition to salads, smoothies, and cooked dishes.",
            img: "https://images.unsplash.com/photo-1580910365203-91ea9115a319?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 3,
            stockCount: 78,
            price: 21.89
        },
        {
            id: 3,
            name: "Organic Eggs",
            description: "Produced by hens raised in free-range environments and fed organic feed, organic eggs are rich in protein and essential nutrients, providing a healthy breakfast or ingredient for baking and cooking.",
            img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 4,
            stockCount: 45,
            price: 14.75
        },
        {
            id: 4,
            name: "Organic Tomatoes",
            description: "Grown without synthetic pesticides, organic tomatoes are bursting with flavor and packed with antioxidants, making them perfect for salads, sandwiches, and sauces.",
            img: "https://images.unsplash.com/photo-1576856497337-4f2be24683da?q=80&w=2891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 5,
            stockCount: 63,
            price: 38.22
        },
        {
            id: 5,
            name: "Organic Milk",
            description: "Produced by cows raised on organic pastures and fed organic feed, organic milk is free from artificial hormones and antibiotics, offering a wholesome and nutritious beverage option.",
            img: "https://images.unsplash.com/photo-1600788907416-456578634209?q=80&w=2850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 6,
            stockCount: 92,
            price: 27.33
        },
        {
            id: 6,
            name: "Organic Carrots",
            description: "Grown without synthetic fertilizers, organic carrots are crisp, sweet, and rich in vitamins and fiber, making them a versatile ingredient for soups, salads, and snacks.",
            img: "https://images.unsplash.com/photo-1639427444459-85a1b6ac2d68?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 0,
            stockCount: 38,
            price: 45.12
        },
        {
            id: 7,
            name: "Organic Chicken",
            description: "Raised without antibiotics or synthetic hormones, organic chicken is free-range and fed organic feed, resulting in tender and flavorful meat suitable for various culinary dishes.",
            img: "https://images.unsplash.com/photo-1633096013004-e2cb4023b560?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 1,
            stockCount: 81,
            price: 19.47
        },
        {
            id: 8,
            name: "Organic Quinoa",
            description: "Cultivated without synthetic pesticides or fertilizers, organic quinoa is a nutrient-dense grain rich in protein, fiber, and essential amino acids, making it a healthy and gluten-free alternative to rice or pasta.",
            img: "https://plus.unsplash.com/premium_photo-1705056546518-9abeabdbb361?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 2,
            stockCount: 24,
            price: 33.78
        },
        {
            id: 9,
            name: "Organic Strawberries",
            description: "Grown without synthetic pesticides, organic strawberries are juicy, sweet, and packed with vitamins and antioxidants, making them a delicious and healthy snack or dessert option.",
            img: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 3,
            stockCount: 57,
            price: 29.65
        },
        {
            id: 10,
            name: "Organic Broccoli",
            description: "Rich in vitamins and minerals, organic broccoli is grown without synthetic pesticides, making it a nutritious and versatile vegetable for stir-fries, salads, and side dishes.",
            img: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 4,
            stockCount: 69,
            price: 17.92
        },
        {
            id: 11,
            name: "Organic Potatoes",
            description: "Grown without synthetic pesticides, organic potatoes are versatile and nutritious, with a rich flavor and texture suitable for various culinary applications, including roasting, mashing, and boiling.",
            img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 5,
            stockCount: 82,
            price: 25.84
        },
        {
            id: 12,
            name: "Organic Blueberries",
            description: "Packed with antioxidants and vitamins, organic blueberries are grown without synthetic pesticides, making them a healthy and delicious addition to breakfast cereals, yogurt, and baked goods.",
            img: "https://images.unsplash.com/photo-1594002348772-bc0cb57ade8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 6,
            stockCount: 63,
            price: 36.78
        },
        {
            id: 13,
            name: "Organic Avocado",
            description: "Rich in healthy fats and vitamins, organic avocados are grown without synthetic pesticides, making them a nutritious and versatile ingredient for salads, sandwiches, and dips.",
            img: "https://images.unsplash.com/photo-1616485828923-2640a1ee48b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 0,
            stockCount: 45,
            price: 19.45
        },
        {
            id: 14,
            name: "Organic Bell Pepper",
            description: "Grown without synthetic pesticides, organic bell peppers are crisp and sweet, with vibrant colors and a fresh flavor that adds depth to salads, stir-fries, and grilled dishes.",
            img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 1,
            stockCount: 79,
            price: 28.94
        },
        {
            id: 15,
            name: "Organic Cucumber",
            description: "Grown without synthetic pesticides, organic cucumbers are crisp, refreshing, and packed with hydration, making them a perfect addition to salads, sandwiches, and snacks.",
            img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 2,
            stockCount: 51,
            price: 16.87
        },
        {
            id: 16,
            name: "Organic Kale",
            description: "Packed with vitamins and minerals, organic kale is grown without synthetic pesticides, making it a nutrient-dense and versatile leafy green suitable for salads, smoothies, and cooked dishes.",
            img: "https://images.unsplash.com/photo-1622943495354-f49d2964094c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 3,
            stockCount: 72,
            price: 22.56
        },
        {
            id: 17,
            name: "Organic Celery",
            description: "Grown without synthetic pesticides, organic celery is crisp, crunchy, and packed with hydration, making it a healthy and refreshing snack or ingredient for salads, soups, and stews.",
            img: "https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            specialDay: 4,
            stockCount: 64,
            price: 18.75
        }];

        await db.item.bulkCreate(items);
    }
}

module.exports = db;
