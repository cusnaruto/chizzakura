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
import URL from "../../url";

const CI_C_Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async (userId) => {
    try {
        const response = await axios.get(`${URL}/CI/${userId}`);
        console.log("Messages fetched:", response.data);
        if (response.data === null) {
            setMessageList([]); 
            return;
        }
        setMessageList(response.data); 
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessageList([]); 
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
    console.log("Joined room:", userId);
    fetchMessages(userId);
    // handleMarkAsRead();

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const sendMessage = async () => {
    if (message !== "") {
      const token = localStorage.getItem("authToken");
      const messageData = {
        token: localStorage.getItem("authToken"),
        message: message,
        sender_id: userId,
        receiver_id: room
      };
      await socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (String(data.conversationId) === String(room)) {
        console.log("I got the message! data:", data);
        console.log("all of them:", data.messageData.sender, data.conversationId, room)
        setMessageList((list) => [...list, data.messageData]);
      }
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [room]);

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
          messageContent.sender !== "2" 
            ? styles["customer"]
            : styles["employee"]
        }`}
      >
        <img
          src={
            messageContent.sender !== "2" 
              ? defaultAvtPic
              : employeeAvtPic
          }
          alt="Avatar"
          className={styles["chat-customer-avt"]}
        />
        <p className={styles["chat-customer-message"]}>
          {messageContent.message}
        </p>
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
