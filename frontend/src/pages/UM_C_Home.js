import React, {useEffect} from 'react';

import '../styles/HomeScreen.css';

import C_Header from '../components/C_Header.js';
import C_Footer from '../components/C_Footer.js';

import restaurantImg from '../assets/Image_C/restaurant.jpg';

const UM_C_Home = () => {
  useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <div className="home-container">
      {/* Header */}
      <C_Header />

      {/* Main Content */}
      <div className="main-content">
        <img src={restaurantImg} alt="Restaurant" className="restaurant-img" />
        <div className="quote">
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
