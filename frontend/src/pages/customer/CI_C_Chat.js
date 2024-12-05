import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import styles from '../../styles/customer/CChat.module.css';
import defaultAvtPic from '../../assets/Image_C/default_avt.jpg';
import employeeAvtPic from '../../assets/Image_C/avtE.png';
import homeImg from '../../assets/Image_C/home.png';

import { socket, userId } from '../../services/socket'; // Import the WebSocket connection and userId
import { fetchMessages, markMessagesAsRead } from '../../services/messageServices'; // Import API services

const CI_C_Chat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
        }

        // Join the selected room
        setRoom(userId);
        socket.emit("join_room", { roomId: userId });

        // Fetch messages for the selected room
        const fetchMessages = async (roomId) => {
            try {
                const response = await axios.get(`http://localhost:8080/CI/${roomId}`);
                setMessageList(response.data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages(userId);
    }, []);

    const sendMessage = async () => {
        if (message !== "") {
            const token = localStorage.getItem('authToken');
            const messageData = {
                token: localStorage.getItem("authToken"), // Include user's token
                room: userId, // Room ID = selected chat ID
                message: message, // Ensure the message content is correctly set
                sender_id: userId, // Include the sender_id in the message data
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((prev) => [...prev, { ...messageData, content: message }]); // Update the state directly with the correct content
            setMessage("");
        }
    };

    useMemo(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]); // Update the state directly
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, []);

    return (
        <div className={styles['chat-page']}>
            <div className={styles['chat-header']}>
                <img src={employeeAvtPic} alt="Avatar" className={styles['chat-employee-avt']} />
                <h2 className={styles['chat-employee-name']}>Nhan vien quan</h2>
                <div className={styles['home-back']} onClick={() => navigate('/home')}>
                    <img src={homeImg} alt="Home" className={styles['nav-icon']} />
                    <span>Home</span>
                </div>
            </div>

            <div className={styles['chat-box']}>
                {messageList.map((messageContent, index) => (
                    <div key={index} className={`${styles['chat-message']} ${messageContent.sender_id === userId ? styles['customer'] : styles['employee']}`}>
                        <img src={messageContent.sender_id === userId ? defaultAvtPic : employeeAvtPic} alt="Avatar" className={styles['chat-customer-avt']} />
                        <p className={styles['chat-customer-message']}>{messageContent.content}</p> {/* Ensure the message content is correctly accessed */}
                    </div>
                ))}
            </div>

            <div className={styles['chat-input']}>
                <img src={defaultAvtPic} alt="Avatar" className={styles['chat-customer-avt']} onClick={() => navigate('/profile')} />
                <input
                    type="text"
                    placeholder="Type message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            <div className={styles['chat-input']}>
                <span>Username: {username}</span>
            </div>
        </div>
    );
};

export default CI_C_Chat;