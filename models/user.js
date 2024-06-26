const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbconfig');

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
  },
  email_sent_time :{
    type : DataTypes.DATE,
    defaultValue : null,
    allowNull : true
  },
  account_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  email_verified_time: {
    type : DataTypes.DATE,
    defaultValue : null,
    allowNull : true
  },
  email_token : {
    type : DataTypes.UUID,
    defaultValue : null,
    allowNull : true,
    readOnly : true
  },
}, {
    timestamps: false

});
User.sync({ force: true })
  .then(() => {
  })
  .catch(error => {
    console.error('Error synchronizing User table:', error);
  });
module.exports = User;