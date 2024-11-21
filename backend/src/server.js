require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewengine");
//import routes
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
//config template engine
configViewEngine(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User Management routes
app.use("/UM/", userRoutes);
app.use("/TM/", tableRoutes);
app.use("/IM/", itemRoutes);
app.use("/DM/", discountRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
