import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaHome, FaUtensils, FaShoppingCart, FaUser } from 'react-icons/fa';
import styles from '../../styles/customer/CFooter.module.css';

const C_Footer = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { path: '/home', icon: <FaHome />, label: 'Home' },
    { path: '/menu', icon: <FaUtensils />, label: 'Menu' },
    { path: '/cart', icon: <FaShoppingCart />, label: 'Cart', count: cartCount },
    { path: '/profile', icon: <FaUser />, label: 'Profile' }
  ];

  return (
    <nav className={styles['footer-nav']}>
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`${styles['nav-item']} ${
            currentLocation.pathname === item.path ? styles['active'] : ''
          }`}
          onClick={() => navigate(item.path)}
        >
          <div className={styles['icon-container']}>
            {item.icon}
            {item.count > 0 && (
              <span className={styles['cart-count']}>{item.count}</span>
            )}
          </div>
          <span className={styles['nav-label']}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default C_Footer;