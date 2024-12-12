require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http"); // Thay thế cho app.listen

const app = express();
const jwt = require("jsonwebtoken"); // Import jwt
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const { Server } = require("socket.io");
const configViewEngine = require("./config/viewengine");
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
const messageRoutes = require("./route/messageRoutes");
const itemReviewRoutes = require("./route/itemReviewsRoutes");
const reportRoutes = require("./route/reportRoutes");

const { sendMessage } = require("./controllers/messageController"); // Import sendMessage function

const Message = require("./model/message"); // Import the Message model

//config template engine
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// Middleware để gắn io vào request object
app.use((req, res, next) => {
  req.io = io;
  next();
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
    console.log(`${data.id} joined room: ${data.room}`);
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
const orderRoutes = require("./route/orderRoutes");
const { report } = require("process");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use("/UM/", userRoutes);
app.use("/TM/", tableRoutes);
app.use("/IM/", itemRoutes);
app.use("/DM/", discountRoutes);
app.use("/OM/", orderRoutes);
app.use("/CI/", messageRoutes);
app.use("/BR/", reportRoutes);
app.use("/reviews", itemReviewRoutes);

app.get("/test-notification", (req, res) => {
  const testMessage = {
    receiver_id: 5, // Replace with the actual userId
    sender_id: 2, // Replace with the actual senderId
    message: "This is a test message",
    content: "This is a test message",
    timestamp: new Date().toISOString(),
  };

  io.to(5).emit("receive_message", testMessage);
  res.send("Test message sent");
});

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});