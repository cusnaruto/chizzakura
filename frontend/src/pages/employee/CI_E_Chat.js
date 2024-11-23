
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../../styles/employee/EChat.module.css';


// import Header from '../../components/E_Header';
// import imgC from '../../assets/Image_C/avt.png';
// import imgE from '../../assets/Image_C/avtE.png';

// const CI_E_Chat = () => {
    
//         const navigate = useNavigate();

//         const [messages1, setMessages1] = useState([
//             { id: 1, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
//             { id: 2, sender: 'dk0z', urlImg: imgE, content: 'I have been trying to reach you about your car extended warranty', time: 'Sun 1:30 PM' },
//             { id: 3, sender: 'You', urlImg: imgC, content: 'Hello', time: 'Sun 1:31 PM' },
//             { id: 4, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
//             { id: 5, sender: 'dk0z', urlImg: imgE, content: 'I have been trying', time: 'Sun 1:30 PM' },
//             { id: 6, sender: 'You', urlImg: imgC, content: 'umm', time: 'Sun 1:31 PM' },
//             { id: 7, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
//             { id: 8, sender: 'dk0z', urlImg: imgE, content: 'extended warranty', time: 'Sun 1:30 PM' },
//             { id: 9, sender: 'You', urlImg: imgC, content: 'Ok', time: 'Sun 1:31 PM' },
//         ]);
//         const [messages2, setMessages2] = useState([
//             { id: 1, sender: 'Tuan', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
//             { id: 2, sender: 'You', urlImg: imgE, content: 'extended warranty', time: 'Sun 1:30 PM' },
//         ]);
//         const [messages3, setMessages3] = useState([
//             { id: 1, sender: 'Duong', urlImg: imgE, content: 'extended warranty', time: 'Sun 1:30 PM' },
//             { id: 2, sender: 'Duong', urlImg: imgE, content: 'Ok', time: 'Sun 1:30 PM' },
//             { id: 3, sender: 'You', urlImg: imgC, content: 'Hello', time: 'Sun 1:31 PM' },
//             { id: 4, sender: 'Duong', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
//         ]);

//         const handleSendMessage = (e) => {
//             e.preventDefault();
//             const input = e.target.elements.message;
//             if (input.value.trim()) {
//               setMessages([...messages, { id: messages.length + 1, sender: 'You', content: input.value, time: 'Now' }]);
//               input.value = '';
//             }
//         };
    
    
//         return (
//             <div>
//                 <Header />
//                 <div className={styles.chatContainer}>

//                     <div className={styles.chatSidebar}>
//                         <input type="text" placeholder="search" className={styles.searchInput} />
//                         <ul className={styles.chatList}>
//                             <li className={styles.chatItem}>
//                                 <img src={imgC} alt="avatar" className={styles.avatar} />
//                                 <div className={styles.chatInfo}>
//                                     <p className={styles.chatName}>dk0z</p>
//                                     <p className={styles.chatPreview}>Hi</p>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>

//                     <div className={styles.chatContent}>
//                         <div className={styles.infoCustomer}>
//                             <img src={imgC} alt="avatar" className={styles.avatar} />
//                             <p className={styles.nameCustomer}>dk0z</p>
//                         </div>
//                         <hr className={styles.divider} />
//                         <div className={styles.chatMessages}>
//                             {messages.map((message) => (
//                                 <div key={message.id} className={`${styles.message} ${message.sender === 'You' ? styles.sent : styles.received}`}>
//                                     <p className={styles.messageText}>{message.content}</p>
//                                     <span className={styles.messageTime}>{message.time}</span>
//                                 </div>
//                             ))}
//                         </div>
//                         <form onSubmit={handleSendMessage} className={styles.messageInputContainer}>
//                             <input name="message" placeholder="reply" className={styles.messageInput} />
//                             <button type="submit" className={styles.sendButton}>Send</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
            
//         );
    
// };

// export default CI_E_Chat;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/employee/EChat.module.css';

import Header from '../../components/E_Header';
import imgC from '../../assets/Image_C/avt.png';
import imgE from '../../assets/Image_C/avtE.png';

const CI_E_Chat = () => {
    const navigate = useNavigate();

    const [messages1, setMessages1] = useState([
        { id: 1, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
        { id: 2, sender: 'dk0z', urlImg: imgE, content: 'I have been trying to reach you about your car extended warranty', time: 'Sun 1:30 PM' },
        { id: 3, sender: 'You', urlImg: imgC, content: 'Hello', time: 'Sun 1:31 PM' },
        { id: 4, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
        { id: 5, sender: 'dk0z', urlImg: imgE, content: 'I have been trying', time: 'Sun 1:30 PM' },
        { id: 6, sender: 'You', urlImg: imgC, content: 'umm', time: 'Sun 1:31 PM' },
        { id: 7, sender: 'dk0z', urlImg: imgE, content: 'Hi', time: 'Sun 1:30 PM' },
        { id: 8, sender: 'dk0z', urlImg: imgE, content: 'extended warranty', time: 'Sun 1:30 PM' },
        { id: 9, sender: 'You', urlImg: imgC, content: 'Ok', time: 'Sun 1:31 PM' },
    ]);

    const [messages2, setMessages2] = useState([
        { id: 1, sender: 'Tuan', urlImg: imgE, content: 'Hello', time: 'Sun 1:32 PM' },
        { id: 2, sender: 'You', urlImg: imgC, content: 'Good morning!', time: 'Sun 1:33 PM' },
    ]);

    const [messages3, setMessages3] = useState([
        { id: 1, sender: 'Duong', urlImg: imgE, content: 'How are you?', time: 'Sun 1:34 PM' },
        { id: 2, sender: 'You', urlImg: imgC, content: 'I am fine, thank you!', time: 'Sun 1:35 PM' },
    ]);

    const [selectedChat, setSelectedChat] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const chatData = [
        { id: 'dk0z', name: 'dk0z', messages: messages1, setMessages: setMessages1 },
        { id: 'Tuan', name: 'Tuan', messages: messages2, setMessages: setMessages2 },
        { id: 'Duong', name: 'Duong', messages: messages3, setMessages: setMessages3 },
    ];

    const filteredChats = chatData.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = (e) => {
        e.preventDefault();
        const input = e.target.elements.message;
        if (input.value.trim() && selectedChat) {
            const chat = chatData.find((chat) => chat.id === selectedChat);
            chat.setMessages([
                ...chat.messages,
                { id: chat.messages.length + 1, sender: 'You', content: input.value, time: 'Now' },
            ]);
            input.value = '';
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.chatContainer}>
                {/* Sidebar */}
                <div className={styles.chatSidebar}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchInput}
                        value={searchTerm} // Bind giá trị của input với state searchTerm
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state khi nhập
                    />
                    <ul className={styles.chatList}>
                        {filteredChats.map((chat) => (
                            <li
                                key={chat.id}
                                className={`${styles.chatItem} ${selectedChat === chat.id ? styles.active : ''}`}
                                onClick={() => setSelectedChat(chat.id)}
                            >
                                <img src={imgC} alt="avatar" className={styles.avatar} />
                                <div className={styles.chatInfo}>
                                    <p className={styles.chatName}>{chat.name}</p>
                                    <p className={styles.chatPreview}>
                                        {chat.messages[chat.messages.length - 1]?.content}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {filteredChats.length === 0 && (
                            <p className={styles.noResult}>No users found</p>
                        )}
                    </ul>
                </div>

                {/* Chat Content */}
                <div className={styles.chatContent}>
                    {selectedChat ? (
                        <>
                            <div className={styles.infoCustomer}>
                                <img src={imgC} alt="avatar" className={styles.avatar} />
                                <p className={styles.nameCustomer}>
                                    {chatData.find((chat) => chat.id === selectedChat).name}
                                </p>
                            </div>
                            <hr className={styles.divider} />
                            <div className={styles.chatMessages}>
                                {chatData
                                    .find((chat) => chat.id === selectedChat)
                                    .messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`${styles.message} ${
                                                message.sender === 'You' ? styles.sent : styles.received
                                            }`}
                                        >
                                            <p className={styles.messageText}>{message.content}</p>
                                            <span className={styles.messageTime}>{message.time}</span>
                                        </div>
                                    ))}
                            </div>
                            <form onSubmit={handleSendMessage} className={styles.messageInputContainer}>
                                <input
                                    name="message"
                                    placeholder="Type a message..."
                                    className={styles.messageInput}
                                />
                                <button type="submit" className={styles.sendButton}>
                                    Send
                                </button>
                            </form>
                        </>
                    ) : (
                        <p className={styles.noChatSelected}>Please select a chat to view messages.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CI_E_Chat;


