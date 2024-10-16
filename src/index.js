require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewengine");
const webRoutes = require("./routes/web");
const connection = require("./config/databaseConnection");

//config template engine
configViewEngine(app);

//routes init
app.use("/", webRoutes);

//test the database connection
connection.query(
  "SELECT * FROM chizzakura.items;",
  function (err, rows, fields) {
    if (err) throw err;
    console.log("The solution is: ", rows);
    console.log("The fields is: ", fields);
  }
);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
