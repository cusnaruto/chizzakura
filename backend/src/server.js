require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http"); // Thay thế cho app.listen
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;

// Import routes
const userRoutes = require("./route/userRoutes");
const tableRoutes = require("./route/tableRoutes");
const itemRoutes = require("./route/itemRoutes");
const discountRoutes = require("./route/discountRoutes");
const orderRoutes = require("./route/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use("/UM/", userRoutes);
app.use("/TM/", tableRoutes);
app.use("/IM/", itemRoutes);
app.use("/DM/", discountRoutes);
app.use("/OM/", orderRoutes);

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả frontend kết nối
  },
});

// Middleware để gắn io vào request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Xử lý kết nối của Socket.IO
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
