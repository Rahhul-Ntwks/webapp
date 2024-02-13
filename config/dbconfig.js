const { Sequelize } = require("sequelize");
//require('dotenv').config()

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres", // Replace 'your_database_name' with your actual database name
  host: "localhost", // You can change the host if your database is hosted elsewhere
  define: {
    freezeTableName: true,
  },
});

async function testConnection() {
  try {
    const resp = await sequelize.authenticate();
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}
module.exports = { testConnection, sequelize };
