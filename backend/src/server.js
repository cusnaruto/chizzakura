require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const path = require("path");
const app = express();
const http = require('http');
const jwt = require("jsonwebtoken"); // Import jwt
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const { Server } = require("socket.io");
const configViewEngine = require("./config/viewengine");
//import routes
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
const messageRoutes = require("./route/messageRoutes");

const { sendMessage } = require("./controllers/messageController"); // Import sendMessage function

const Message = require("./model/message"); // Import the Message model

//config template engine
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Define SECRET_KEY

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    socket.user = decoded; // Attach decoded user to socket
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username} joined room: ${data.room}`);
    return data.room;
  });

  socket.on("send_message", (data) => {
      sendMessage({ ...data, sender_id: socket.user.id }, io);
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
app.use("/CI/", messageRoutes);
server.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}!`);
});
