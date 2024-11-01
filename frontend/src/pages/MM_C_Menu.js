import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuPage.css'; 

import C_Header from '../components/C_Header.js';
import C_Footer from '../components/C_Footer.js';

import pizzaImg from '../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../assets/Image_C/product_3.1.jpg';

const MM_C_Menu = () => {

    const navigate = useNavigate();

    return (
        <div className="product-page-container">

            {/* Header */}
            <C_Header />

            <div className="tabs-container">
                <div className="tab">Vegetable</div>
                <div className="tab">Meat</div>
                <div className="tab">Super</div>
                <div className="tab">Other</div>
            </div>

            {/* Phần danh sách sản phẩm */}
            <div className="product-grid">
                <div className="product-card">
                    <img src={pizzaImg} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg2} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg3} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
                <div className="product-card">
                    <img src={pizzaImg4} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <button className="add-to-cart-btn">Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button className="page-btn">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">&gt;</button>
            </div>
            <button className="view-cart-btn" onClick={() => navigate('/cart')}>View cart</button>
        
            {/* Footer */}
            <C_Footer />

        </div>
    );
};

export default MM_C_Menu;
