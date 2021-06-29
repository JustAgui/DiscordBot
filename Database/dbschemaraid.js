module.exports = (sequelize, DataTypes) => {
    return sequelize.define('raid', {
        bossname: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        level: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        buff: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        notiz: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
};
