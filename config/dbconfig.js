const { Sequelize } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: "localhost", 
  define: {
    freezeTableName: true,
  },
});

async function testConnection() {
  try {
    const resp = await sequelize.authenticate();
    console.log(`resp is ${resp}`);
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}
module.exports = { testConnection, sequelize };
