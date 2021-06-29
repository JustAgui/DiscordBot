module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userheroes', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        heroname: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        stars: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        awaken: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        weapon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
};
