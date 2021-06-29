const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './Database/sqlite_databases/userheroes.sqlite',
});

let Userheroes = require('./dbschemauserheroes')(sequelize, Sequelize.DataTypes);

/* eslint-disable-next-line func-names */
Userheroes.prototype.findUser = async function(username) {
    return await Userheroes.findOne({ where: { username: username } });
};

/* eslint-disable-next-line func-names */
Userheroes.prototype.getItems = function() {
    return Userheroes.findAll({
        where: { username: this.username },
        include: ['item'],
    });
};

module.exports = { Userheroes };
