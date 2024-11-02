import React, {useEffect} from 'react';

import styles from '../../styles/customer/CHomeScreen.module.css';

import C_Header from '../../components/customer/C_Header.js';
import C_Footer from '../../components/customer/C_Footer.js';

import restaurantImg from '../../assets/Image_C/restaurant.jpg';

const UM_C_Home = () => {
  useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <div className={styles['home-container']}>
      {/* Header */}
      <C_Header />

      {/* Main Content */}
      <div className={styles['main-content']}>
        <img src={restaurantImg} alt="Restaurant" className={styles['restaurant-img']} />
        <div className={styles['quote']}>
          <p>"Ăn là mê, về là nhớ"</p>
          <p>-Chizzakura-</p>
        </div>
      </div>

      {/* Footer */}
      <C_Footer />
    </div>
  );
};


export default UM_C_Home;
