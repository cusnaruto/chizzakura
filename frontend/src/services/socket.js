import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const SOCKET_URL = "http://localhost:8080"; // Replace with your backend URL

const token = localStorage.getItem("authToken");
let userId = null;

if (token) {
  const decoded = jwtDecode(token);
  userId = decoded.id;
}

const socket = io(SOCKET_URL, {
  auth: {
    token: token, // Send token for authentication
  },
});

export { socket, userId };
