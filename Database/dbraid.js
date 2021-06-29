const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './Database/sqlite_databases/raid.sqlite',
});

let Raid = require('./dbschemaraid')(sequelize, Sequelize.DataTypes);
let Damagedealers = require('./dbschemadd')(sequelize, Sequelize.DataTypes);

/* eslint-disable-next-line func-names */
Raid.prototype.findBosslevel = async function(bossname, level) {
    return await Raid.findOne({ where: { bossname: bossname, level: level } });
};

/* eslint-disable-next-line func-names */
Raid.prototype.findBoss = function(bossname) {
    return Raid.findAll({ where: { bossname: bossname } });
};

module.exports = { Raid, Damagedealers };
