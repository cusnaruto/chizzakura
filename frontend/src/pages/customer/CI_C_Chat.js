import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "../../styles/customer/CChat.module.css";
import defaultAvtPic from "../../assets/Image_C/default_avt.jpg";
import employeeAvtPic from "../../assets/Image_C/avtE.png";
import homeImg from "../../assets/Image_C/home.png";

import { socket, userId } from "../../services/socket"; // Import the WebSocket connection and userId
import {
  fetchMessages,
  markMessagesAsRead,
} from "../../services/messageServices"; // Import API services
import URL_BE from "../../url";

const CI_C_Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(`${URL_BE}/CI/${roomId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Tạo một ref để tham chiếu tới phần cuối danh sách tin nhắn
  const messageEndRef = useRef(null);

  // Hàm cuộn xuống cuối danh sách
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gọi scrollToBottom khi nhận tin nhắn mới hoặc khi danh sách thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
    // Join the selected room
    setRoom(userId);
    socket.emit("join_room", { room: userId });
    fetchMessages(userId);
    handleMarkAsRead();

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const sendMessage = async () => {
    if (message !== "") {
      const token = localStorage.getItem("authToken");
      const messageData = {
        token: localStorage.getItem("authToken"), // Include user's token
        room: userId, // Room ID = selected chat ID
        message: message, // Ensure the message content is correctly set
        sender_id: userId, // Include the sender_id in the message data
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      //setMessageList((prev) => [...prev, { ...messageData, content: message }]); // Update the state directly with the correct content
      setMessage("");
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await markMessagesAsRead(2, userId);
      console.log("Messages marked as read");
    } catch (error) {
      console.error("Failed to mark messages as read");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data.receiver_id === userId) {
        console.log("I got the fucking message! data:", data);
        setMessageList((list) => [...list, data]);
        // if (Notification.permission === "granted") {
        //     new Notification("New Message", {
        //         body: data.message,
        //         icon: employeeAvtPic,
        //     });
        // }
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    // socket.on("receive_message", handleReceiveMessage);

    // Clean up the effect to avoid multiple connections
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  return (
    <div className={styles["chat-page"]}>
      <div className={styles["chat-header"]}>
        <img
          src={employeeAvtPic}
          alt="Avatar"
          className={styles["chat-employee-avt"]}
        />
        <h2 className={styles["chat-employee-name"]}>Employee</h2>
        <div className={styles["home-back"]} onClick={() => navigate("/home")}>
          <img src={homeImg} alt="Home" className={styles["nav-icon"]} />
          <span>Home</span>
        </div>
      </div>

      <div className={styles["chat-box"]}>
        {messageList.map((messageContent, index) => (
          <div
            key={index}
            className={`${styles["chat-message"]} ${
              messageContent.sender_id === userId
                ? styles["customer"]
                : styles["employee"]
            }`}
          >
            <img
              src={
                messageContent.sender_id === userId
                  ? defaultAvtPic
                  : employeeAvtPic
              }
              alt="Avatar"
              className={styles["chat-customer-avt"]}
            />
            <p className={styles["chat-customer-message"]}>
              {messageContent.content}
            </p>{" "}
            {/* Ensure the message content is correctly accessed */}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className={styles["chat-input"]}>
        <span>Username: {username}</span>
      </div>
      <div className={styles["chat-input"]}>
        <img
          src={defaultAvtPic}
          alt="Avatar"
          className={styles["chat-customer-avt"]}
          onClick={() => navigate("/profile")}
        />
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CI_C_Chat;
