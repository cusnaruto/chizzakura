
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/employee/EChat.module.css';


import Header from '../../components/O_Header';

const CI_E_Chat = () => {
    
        const navigate = useNavigate();

        const [messages, setMessages] = useState([
            { id: 1, sender: 'dk0z', content: 'Hi', time: 'Sun 1:30 PM' },
            { id: 2, sender: 'dk0z', content: 'I have been trying to reach you about your car\'s extended warranty', time: 'Sun 1:30 PM' },
            { id: 3, sender: 'You', content: 'Ligma', time: 'Sun 1:31 PM' },
        ]);

        const handleSendMessage = (e) => {
            e.preventDefault();
            const input = e.target.elements.message;
            if (input.value.trim()) {
              setMessages([...messages, { id: messages.length + 1, sender: 'You', content: input.value, time: 'Now' }]);
              input.value = '';
            }
        };
    
    
        return (
            <div>
                <Header />
                <div className={styles.chatContainer}>

                    <div className={styles.chatSidebar}>
                        <input type="text" placeholder="search" className={styles.searchInput} />
                        <ul className={styles.chatList}>
                            <li className={styles.chatItem}>
                                <img src="avatar_placeholder.jpg" alt="avatar" className={styles.avatar} />
                                <div className={styles.chatInfo}>
                                    <p className={styles.chatName}>dk0z</p>
                                    <p className={styles.chatPreview}>I have been trying to reach...</p>
                                </div>
                            </li>
                        {/* Có thể thêm các chat khác ở đây */}
                        </ul>
                    </div>

                    <div className={styles.chatContent}>
                        <div className={styles.chatMessages}>
                            {messages.map((message) => (
                                <div key={message.id} className={`${styles.message} ${message.sender === 'You' ? styles.sent : styles.received}`}>
                                    <p className={styles.messageText}>{message.content}</p>
                                    <span className={styles.messageTime}>{message.time}</span>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className={styles.messageInputContainer}>
                            <input name="message" placeholder="reply" className={styles.messageInput} />
                            <button type="submit" className={styles.sendButton}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            
        );
    
};

export default CI_E_Chat;

