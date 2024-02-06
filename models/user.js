const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
});
module.exports = User;