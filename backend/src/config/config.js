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
    username: process.env.TEST_DB_USERNAME || `${$YOUR_ACCOUNT}`,
    password: process.env.TEST_DB_PASSWORD || "chizzakura",
    database: process.env.TEST_DB_NAME || `${$YOUR_ACCOUNT}_chizzakura`,
    host: process.env.TEST_DB_HOST || `${$MYSQL_SERVICE_HOST}`,
    port: process.env.TEST_DB_PORT || `${$MYSQL_SERVICE_PORT}`,
    dialect: "mysql",
  },
  production: {
    username: process.env.PROD_DB_USERNAME || "root",
    password: process.env.PROD_DB_PASSWORD || null,
    database: process.env.PROD_DB_NAME || "database_production",
    host: process.env.PROD_DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};
