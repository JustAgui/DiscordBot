module.exports = (sequelize, DataTypes) => {
    return sequelize.define('angrygerman', {
        date: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
};
