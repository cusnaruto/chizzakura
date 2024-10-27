require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewengine");
const webRoutes = require("./route/web");
const connection = require("./config/databaseConnection");
//config template engine
configViewEngine(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User Management routes
app.use("/UM/", webRoutes.router);

connection.authenticate();

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
