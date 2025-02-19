import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import URL from "../url";

const token = localStorage.getItem("authToken");
let userId = null;
let role = null;

if (token) {
  const decoded = jwtDecode(token);
  userId = decoded.id;
  role = decoded.role;
  console.log("from socket.js, this userId is", userId);
}

const socket = io(URL, {
  auth: {
    token: token, // Send token for authentication
  },
  transports: ["websocket", "polling"],
});

export { socket, userId, role };
