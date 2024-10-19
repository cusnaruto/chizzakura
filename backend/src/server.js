require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewengine");
const webRoutes = require("./routes/web");
//config template engine
configViewEngine(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User Management routes
app.use("/UM/", webRoutes.router);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
