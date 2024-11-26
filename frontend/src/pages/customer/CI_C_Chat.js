import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import styles from '../../styles/customer/CChat.module.css';

import defaultAvtPic from '../../assets/Image_C/default_avt.jpg';
import employeeAvtPic from '../../assets/Image_C/avtE.png';
import homeImg from '../../assets/Image_C/home.png';

const socket = io.connect("http://localhost:8080");

const CI_C_Chat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate();

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", { username, room });
            console.log(`${username} joined room: ${room}`);
        }
    };

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                username: username,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessage("");
        }
    };

    useMemo(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        // Clean up the effect to avoid multiple connections
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
                    <div key={index} className={`${styles['chat-message']} ${messageContent.username === username ? styles['customer'] : styles['employee']}`}>
                        <img src={messageContent.username === username ? defaultAvtPic : employeeAvtPic} alt="Avatar" className={styles['chat-customer-avt']} />
                        <p className={styles['chat-customer-message']}>{messageContent.message}</p>
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
                <input
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Room..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default CI_C_Chat;