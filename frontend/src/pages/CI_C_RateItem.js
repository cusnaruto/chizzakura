import React from 'react';
import '../styles/MenuPage.css'; 

import C_Header from '../components/C_Header.js';
// import C_Footer from '../components/C_Footer.js';

import pizzaImg from '../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../assets/Image_C/product_3.1.jpg';

const CI_C_RateItem = () => {

    const onComment = () => {
        console.log("Comment");
    };

    return (
        <div className="product-page-container">

            {/* Header */}
            <C_Header />

            {/* Phần danh sách sản phẩm */}
            <div className="product-grid product-rate">
                <div className="product-card">
                    <img src={pizzaImg} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn comment-btn" onClick={onComment}>Comment</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg2} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn comment-btn" onClick={onComment}>Comment</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg3} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn comment-btn" onClick={onComment}>Comment</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg4} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn comment-btn" onClick={onComment}>Comment</button>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button className="page-btn">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">&gt;</button>
            </div>
            <button className="view-cart-btn save-btn">Save</button>
        
            {/* Footer */}
            <div className="footer-page">
                <h2>Rate our foods!!!</h2>
            </div>

        </div>
    );
};

export default CI_C_RateItem;
