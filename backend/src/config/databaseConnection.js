require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || `${$YOUR_ACCOUNT}_chizzakura`,
  process.env.DB_USER || $YOUR_ACCOUNT,
  process.env.DB_PASSWORD || "chizzakura",
  {
    host: process.env.DB_HOST || $MYSQL_SERVICE_HOST,
    port: process.env.DB_PORT || $MYSQL_SERVICE_PORT,
    dialect: "mysql",
    timezone: "+07:00",
  }
);

module.exports = sequelize;
