module.exports = (sequelize, DataTypes) => {
    const Details = sequelize.define("Details", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Link : {
            type: DataTypes.STRING,
            allowNull: true 
        },
    });

    return Details;
}