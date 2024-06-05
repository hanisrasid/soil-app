module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false 
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        hooks: {
            afterCreate: async (user) => {
                await sequelize.models.shoppingCart.create({
                    userID: user.id
                });
            }
        },
        timestamps: false
    });

    User.associate = models => {
        User.hasOne(models.shoppingCart, {
            onDelete: "cascade",
            foreignKey: "userID"
        });
        User.hasMany(models.follower, {
            onDelete: "cascade",
            foreignKey: "userID"
        });
        User.hasMany(models.review, {
            onDelete: "cascade",
            foreignKey: "userID"
        });
    }

    return User;
}
