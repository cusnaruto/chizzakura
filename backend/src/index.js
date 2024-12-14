const express =  require("express");
const app = express();
const db = require("./models");
const sequelize = require("./config/databaseConnection");

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });