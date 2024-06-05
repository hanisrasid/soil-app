module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("cartItem", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cartID: {
            type: DataTypes.INTEGER
        },
        itemID: {
            type: DataTypes.INTEGER
        },
        itemPrice: {
            type: DataTypes.DECIMAL(10,2)
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    },
        { timestamps: false }
    );
    CartItem.associate = models => {
        CartItem.belongsTo(models.shoppingCart, {
            foreignKey: "cartID"
        });
        CartItem.belongsTo(models.item, {
            foreignKey: "itemID"
        });
    }
    return CartItem;
}