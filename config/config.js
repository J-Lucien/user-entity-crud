const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('userapi', 'root', 'secret', {
  host: 'localhost',
  dialect: 'mysql',  
  logging: false,
});

module.exports = sequelize;
