const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './Database/sqlite_databases/angrygerman.sqlite',
});

let Angrygerman = require('./dbschemaangrygerman')(sequelize, Sequelize.DataTypes);

module.exports = { Angrygerman };
