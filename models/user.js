const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const User = sequelize.define('User', {
  id : {
    type : DataTypes.UUID,
    primaryKey : true,
    defaultValue : Sequelize.UUIDV4,
    allowNull : false,
    readOnly : true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull : false
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false
  },
  username : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true,
    validate : {
      isEmail :true
    }
  },
  account_created : {
    type : DataTypes.DATE,
    defaultValue : DataTypes.NOW,
    allowNull : false,
    readOnly : true
  },
  account_updated : {
    type : DataTypes.DATE,
    defaultValue : DataTypes.NOW,
    allowNull : false,
  }
});
module.exports = User;