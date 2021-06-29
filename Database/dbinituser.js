const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const User = require('./dbschemauser.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

User.sync({ force }).then(async () => {
    console.log('Database synced');
}).catch(console.error);
