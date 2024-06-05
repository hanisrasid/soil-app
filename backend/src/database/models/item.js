module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("item", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        description: {
            type: DataTypes.STRING
        },
        stockCount: {
            type: DataTypes.INTEGER
        },
        specialDay: {
            type: DataTypes.INTEGER
        },
        img: {
            type: DataTypes.STRING
        }
    },
        { timestamps: false }
    );

    Item.associate = models => {
        Item.hasMany(models.cartItem, {
            foreignKey: "itemID"
        });
        Item.hasMany(models.review, {
            foreignKey: "itemID"
        });
    }
    return Item;
}