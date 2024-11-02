import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

import styles from '../../styles/customer/CFooter.module.css';

import cartImg from '../../assets/Image_C/cart.png';
import foodImg from '../../assets/Image_C/food.png';
import profileImg from '../../assets/Image_C/user.png';
import homeImg from '../../assets/Image_C/home.png';

const C_Footer = () => {

  const currentLocation = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles['footer-nav']}>
      <div className={`${styles['nav-item']} ${currentLocation.pathname === '/home' ? styles['active'] : ''}`} onClick={() => navigate('/home')}>
        <img src={homeImg} alt="Home" className={styles['nav-icon']} />
        <span>Home</span>
      </div>
      <div className={`${styles['nav-item']} ${currentLocation.pathname === '/menu' ? styles['active'] : ''}`} onClick={() => navigate('/menu')}>
        <img src={foodImg} alt="Menu" className={styles['nav-icon']} />
        <span>Menu</span>
      </div>
      <div className={`${styles['nav-item']} ${currentLocation.pathname === '/cart' ? styles['active'] : ''}`} onClick={() => navigate('/cart')}>
        <img src={cartImg} alt="Cart" className={styles['nav-icon']} />
        <span>Cart</span>
        <div className={styles['cart-count']}>10</div>
      </div>
      <div className={`${styles['nav-item']} ${currentLocation.pathname === '/profile' ? styles['active'] : ''}`} onClick={() => navigate('/profile')}>
        <img src={profileImg} alt="Profile" className={styles['nav-icon']} />
        <span>Profile</span>
      </div>

    </div>
  );
};

export default C_Footer;
