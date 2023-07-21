const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('asset', 'postgres',process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect:'postgres'
  });



module.exports = sequelize;