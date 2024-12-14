import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/Image_C/logo.jpg';

import styles from '../../styles/customer/CHeader.module.css';

const C_Header = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['header']}>
      <div className={styles['logo']} onClick={() => navigate('/home')}>
        <img src={logoImg} alt="Chizzakura" className={styles['logo-img']} />
        <span>Chizzakura</span>
      </div>
      <div className={styles['chat']} onClick={() => navigate('/chat')}>
        <div className={styles['chat-icon']}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M2 3C0.9 3 0 3.9 0 5V15C0 16.1 0.9 17 2 17H6V21L10 17H18C19.1 17 20 16.1 20 15V5C20 3.9 19.1 3 18 3H2M2 5H18V15H9.5L6.5 18V15H2V5Z" />
          </svg>
          {/* <div className={styles['chat-notification']}>10</div> */}
        </div>
      </div>
    </div>
  );
};

export default C_Header;
