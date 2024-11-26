require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const path = require("path");
const app = express();
const http = require('http');
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const { Server } = require("socket.io");
const configViewEngine = require("./config/viewengine");
//import routes
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
//config template engine
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username} joined room: ${data.room}`);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
    console.log(`Message sent to room: ${data.room}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
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

server.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
