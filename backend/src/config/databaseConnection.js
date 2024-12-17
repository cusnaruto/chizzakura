require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.TEST_DB_NAME ||
    `${process.env.YOUR_ACCOUNT}_chizzakura` ||
    "fall2024c8g11_chizzakura",
  process.env.YOUR_ACCOUNT || `fall2024c8g11`,
  process.env.DB_PASSWORD || "chizzakura",
  {
    host: process.env.MYSQL_SERVICE_HOST || "10.104.66.205",
    port: process.env.MYSQL_SERVICE_PORT || "3306",
    dialect: "mysql",
    timezone: "+07:00",
  }
);

module.exports = sequelize;
