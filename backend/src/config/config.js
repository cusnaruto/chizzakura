require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "chizzakura",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3308",
    dialect: "mysql",
  },
  test: {
    username: process.env.YOUR_ACCOUNT || `fall2024c8g11`,
    password: process.env.DB_PASSWORD || "chizzakura",
    database:
      process.env.TEST_DB_NAME ||
      `${process.env.YOUR_ACCOUNT}_chizzakura` ||
      "fall2024c8g11_chizzakura",
    host: process.env.MYSQL_SERVICE_HOST || "10.104.66.205",
    port: process.env.MYSQL_SERVICE_PORT || "3306",
    dialect: "mysql",
  },
  production: {
    username: process.env.YOUR_ACCOUNT || `fall2024c8g11`,
    password: process.env.DB_PASSWORD || "chizzakura",
    database:
      process.env.TEST_DB_NAME ||
      `${process.env.YOUR_ACCOUNT}_chizzakura` ||
      "fall2024c8g11_chizzakura",
    host: process.env.MYSQL_SERVICE_HOST || "10.104.66.205",
    port: process.env.MYSQL_SERVICE_PORT || "3306",
    dialect: "mysql",
  },
};
