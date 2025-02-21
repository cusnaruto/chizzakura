require("dotenv").config();

const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    database: process.env.DB_NAME || "chizzakura",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
  },
  test: {
    database: process.env.TEST_DB_NAME || "fall2024c8g11_chizzakura",
    username: process.env.YOUR_ACCOUNT || "fall2024c8g11",
    password: process.env.DB_PASSWORD || "chizzakura",
    host: process.env.MYSQL_SERVICE_HOST || "10.104.66.205",
    port: process.env.MYSQL_SERVICE_PORT || "3306",
  },
  production: {
    database: process.env.TEST_DB_NAME || "fall2024c8g11_chizzakura",
    username: process.env.YOUR_ACCOUNT || "fall2024c8g11",
    password: process.env.DB_PASSWORD || "chizzakura",
    host: process.env.MYSQL_SERVICE_HOST || "10.104.66.205",
    port: process.env.MYSQL_SERVICE_PORT || "3306",
  },
};

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    port: config[env].port,
    dialect: "mysql",
    timezone: "+07:00",
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
  }
);

module.exports = sequelize;
