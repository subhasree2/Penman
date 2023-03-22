// Export a variable/object/function and use it in all other files
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        })

        Posts.hasMany(models.Likes, {
            onDelete: "cascade"
        })
    }

    return Posts;
}