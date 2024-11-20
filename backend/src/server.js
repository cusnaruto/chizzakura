require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const path = require("path");
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewengine");
//import routes
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
const { Server } = require("http");
//config template engine
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log(`👋: ${socket.id} user just disconnected!`);
  });
});


configViewEngine(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User Management routes
app.use("/UM/", userRoutes);
app.use("/TM/", tableRoutes);
app.use("/IM/", itemRoutes);
app.use("/DM/", discountRoutes);

http.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
