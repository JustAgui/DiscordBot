const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './sqlite_databases/angrygerman.sqlite',
});

const Angrygerman = require('./dbschemaangrygerman.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

Angrygerman.sequelize.sync({ force: true, logging: console.log }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);
