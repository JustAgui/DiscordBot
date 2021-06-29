module.exports = (sequelize, DataTypes) => {
    return sequelize.define('damagedealer', {
        userid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        bossname: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        damage: {
            type: DataTypes.REAL,
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
