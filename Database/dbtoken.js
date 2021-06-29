const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './Database/sqlite_databases/database.sqlite',
});

let Users = require('./dbschemauser')(sequelize, Sequelize.DataTypes);

/* eslint-disable-next-line func-names */
Users.prototype.findUser = async function(userid) {
    return await Users.findOne({ where: { user_id: userid } });
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = function() {
    return Users.findAll({
        where: { user_id: this.user_id },
        include: ['item'],
    });
};

/* eslint-disable-next-line func-names */
Users.prototype.getSum = function() {
    return Users.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('balance')), 'total']],
        raw: true,
    });
};


module.exports = { Users };
