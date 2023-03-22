module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentBody: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
    });

    return Comments;
}