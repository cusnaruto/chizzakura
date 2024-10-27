import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuPage.css'; 

import C_Header from '../components/C_Header.js';
import C_Footer from '../components/C_Footer.js';

import pizzaImg from '../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../assets/Image_C/product_3.1.jpg';

const OM_C_Cart = () => {

    const navigate = useNavigate();

    const onIncrement = () => {
        console.log("Increment");
    };
    const onDecrement = () => {
        console.log("Decrement");
    };
    const onRemove = () => {
        console.log("Remove");
    };

    return (
        <div className="product-page-container">

            {/* Header */}
            <C_Header />

            {/* Phần danh sách sản phẩm */}
            <div className="product-grid product-sold">
                <div className="product-card">
                    <button className="remove-btn" onClick={onRemove}>X</button>
                    <img src={pizzaImg} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <div className="quantity-controls">
                            <button onClick={onDecrement}>-</button>
                            <span>20</span>
                            <button onClick={onIncrement}>+</button>
                        </div>                    
                    </div>
                </div>
                <div className="product-card">
                    <button className="remove-btn" onClick={onRemove}>X</button>
                    <img src={pizzaImg2} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <div className="quantity-controls">
                            <button onClick={onDecrement}>-</button>
                            <span>10</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
                <div className="product-card">
                    <button className="remove-btn" onClick={onRemove}>X</button>
                    <img src={pizzaImg3} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <div className="quantity-controls">
                            <button onClick={onDecrement}>-</button>
                            <span>5</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
                <div className="product-card">
                    <button className="remove-btn" onClick={onRemove}>X</button>
                    <img src={pizzaImg4} alt="Meat Pizza" className="product-img" />
                    <div className="product-info">
                        <span className="product-price">$12</span>
                        <h3 className="product-name">Meat Pizza</h3>
                        <div className="product-rating">★★★★★</div>
                        <div className="quantity-controls">
                            <button onClick={onDecrement}>-</button>
                            <span>4</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button className="page-btn">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">&gt;</button>
            </div>
            <button className="view-cart-btn check-out-btn" onClick={() => navigate('/checkout')}>Check out</button>
        
            {/* Footer */}
            <C_Footer />

        </div>
    );
};

export default OM_C_Cart;
