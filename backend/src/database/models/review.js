module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itemID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING
        },
        stars: {
            type: DataTypes.INTEGER
        }
    },
        { timestamps: false }
    );

    Review.associate = models => {
        Review.belongsTo(models.item, {
            foreignKey: "itemID"
        });
        Review.belongsTo(models.user, {
            foreignKey: "userID"
        });
    }
    return Review;
}