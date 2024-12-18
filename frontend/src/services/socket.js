import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import URL from "../url";
const SOCKET_URL = URL;

const token = localStorage.getItem("authToken");
let userId = null;
let role = null;

if (token) {
  const decoded = jwtDecode(token);
  userId = decoded.id;
  role = decoded.role;
  console.log("from socket.js, this userId is", userId);
}

const socket = io(SOCKET_URL, {
  auth: {
    token: token, // Send token for authentication
  },
});

export { socket, userId, role };
