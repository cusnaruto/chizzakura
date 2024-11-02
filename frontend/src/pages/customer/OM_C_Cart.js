import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CMenuPage.module.css'; 

import C_Header from '../../components/customer/C_Header.js';
import C_Footer from '../../components/customer/C_Footer.js';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.1.jpg';

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
        <div className={styles['product-page-container']}>

            {/* Header */}
            <C_Header />

            {/* Phần danh sách sản phẩm */}
            <div className={`${styles['product-grid']} ${styles['product-sold']}`}>
                <div className={styles['product-card']}>
                    <button className={styles['remove-btn']} onClick={onRemove}>X</button>
                    <img src={pizzaImg} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <div className={styles['quantity-controls']}>
                            <button onClick={onDecrement}>-</button>
                            <span>20</span>
                            <button onClick={onIncrement}>+</button>
                        </div>                    
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <button className={styles['remove-btn']} onClick={onRemove}>X</button>
                    <img src={pizzaImg2} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <div className={styles['quantity-controls']}>
                            <button onClick={onDecrement}>-</button>
                            <span>10</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <button className={styles['remove-btn']} onClick={onRemove}>X</button>
                    <img src={pizzaImg3} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <div className={styles['quantity-controls']}>
                            <button onClick={onDecrement}>-</button>
                            <span>5</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <button className={styles['remove-btn']} onClick={onRemove}>X</button>
                    <img src={pizzaImg4} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <div className={styles['quantity-controls']}>
                            <button onClick={onDecrement}>-</button>
                            <span>4</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className={styles['pagination']}>
                <button className={styles['page-btn']}>1</button>
                <button className={styles['page-btn']}>2</button>
                <button className={styles['page-btn']}>&gt;</button>
            </div>
            <button className={styles['check-out-btn']} onClick={() => navigate('/checkout')}>Check out</button>
        
            {/* Footer */}
            <C_Footer />

        </div>
    );
};

export default OM_C_Cart;
