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

// Handle socket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username} joined room: ${data.room}`);
  });

  socket.on("send_message", async (data) => {
    const { token, room, message } = data;
    console.log(data);
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      const messageData = {
        sender_id: decoded.id,
        receiver_id: room,
        content: message,
        timestamp: timestamp,
        status: "sent",
      };

      // Save the message to the database
      await Message.create(messageData);

      io.to(room).emit("receive_message", messageData);
      console.log(`Message sent to room: ${room}`);
    } catch (error) {
      console.error("Invalid token:", error.message);
    }
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
