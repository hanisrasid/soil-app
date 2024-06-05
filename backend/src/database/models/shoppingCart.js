module.exports = (sequelize, DataTypes) => {
    const ShoppingCart = sequelize.define("shoppingCart", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.INTEGER
        }
    },
    { timestamps: false }
    );

    ShoppingCart.associate = models => {
        ShoppingCart.belongsTo(models.user, {
            foreignKey: "userID"
        })

        ShoppingCart.hasMany(models.cartItem, {
            foreignKey: "cartID"
        })
    }

    return ShoppingCart;
}
