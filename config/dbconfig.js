const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_FILE,{
  define : {
    freezeTableName : true
  }
})

async function testConnection(){
try {
   const resp =  await sequelize.authenticate();
    return true
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false
  }
}
  module.exports = {testConnection};