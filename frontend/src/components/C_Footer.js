import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

import cartImg from '../assets/Image_C/cart.png';
import foodImg from '../assets/Image_C/food.png';
import profileImg from '../assets/Image_C/user.png';
import homeImg from '../assets/Image_C/home.png';

const C_Footer = () => {

  const currentLocation = useLocation();
  const navigate = useNavigate();
  return (
    <div className="footer-nav">
      <div className={`nav-item ${currentLocation.pathname ===  '/home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
        <img src={homeImg} alt="Home" className="nav-icon" />
        <span>Home</span>
      </div>
      <div className={`nav-item ${currentLocation.pathname === '/menu' ? 'active' : ''}`} onClick={() => navigate('/menu')}>
        <img src={foodImg} alt="Menu" className="nav-icon" />
        <span>Menu</span>
      </div>
      <div className={`nav-item ${currentLocation.pathname === '/cart' ? 'active' : ''}`} onClick={() => navigate('/cart')}>
        <img src={cartImg} alt="Cart" className="nav-icon" />
        <span>Cart</span>
        <div className="cart-count">10</div>
      </div>
      <div className={`nav-item ${currentLocation.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>
        <img src={profileImg} alt="Profile" className="nav-icon" />
        <span>Profile</span>
      </div>
    </div>
  );
};

export default C_Footer;
