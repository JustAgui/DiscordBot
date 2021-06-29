const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './sqlite_databases/raid.sqlite',
});

require('./dbschemaraid.js')(sequelize, Sequelize.DataTypes);
require('./dbschemadd.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({logging: true}).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);