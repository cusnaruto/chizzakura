import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CChat.module.css';

import defaultAvtPic from '../../assets/Image_C/default_avt.jpg';
import employeeAvtPic from '../../assets/Image_C/avtE.png';

const CI_C_Chat = () => {

    const navigate = useNavigate();

    const userInfo = {
        Name: 'Minh Tuan',
        profilePic: null,
    };


    return (

        <div className={styles['chat-page']}>
            <div className={styles['chat-header']}>
                <img src={employeeAvtPic} alt="Avatar" className={styles['chat-employee-avt']} />
                <h2 className={styles['chat-employee-name']}>Nhan vien quan</h2>
            </div>

            <div className={styles['chat-box']}>
                <div className={`${styles['chat-message']} ${styles['customer']}`}>
                    <img src={defaultAvtPic} alt="Avatar" className={styles['chat-customer-avt']} />
                    <p className={styles['chat-customer-message']}>こんにちは</p>
                </div>
                <div className={`${styles['chat-message']} ${styles['employee']}`}>
                    <img src={employeeAvtPic} alt="Avatar" className={styles['chat-employee-avt']} />
                    <p className={styles['chat-employee-message']}>こんにちは、何が必要ですか？</p>
                </div>
                <div className={`${styles['chat-message']} ${styles['customer']}`}>
                    <img src={defaultAvtPic} alt="Avatar" className={styles['chat-customer-avt']} />
                    <p className={styles['chat-customer-message']}>最高のチッツァをください</p>
                </div>
                <div className={`${styles['chat-message']} ${styles['employee']}`}>
                    <img src={employeeAvtPic} alt="Avatar" className={styles['chat-employee-avt']} />
                    <p className={styles['chat-employee-message']}>ちょっと、ここにあります</p>
                </div>
            </div>

            <div className={styles['chat-input']}>
                <img src={defaultAvtPic} alt="Avatar" className={styles['chat-customer-avt']} onClick={() => navigate('/profile')}/>
                <input type="text" placeholder="Type message..." />
                <button>Send</button>
            </div>

        </div>
        
    );
        
};

export default CI_C_Chat;