module.exports = (sequelize, DataTypes) => {
    const Follower = sequelize.define("follower", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        followingID: {
            type: DataTypes.INTEGER
        },
        followerID: {
            type: DataTypes.INTEGER
        }
    },
        { timestamps: false }
    );

    Follower.associate = models => {
        Follower.belongsTo(models.user, {
            foreignKey: "userID"
        })
    }
    return Follower;
}