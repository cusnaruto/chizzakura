import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CMenuPage.module.css'; 

import C_Header from '../../components/customer/C_Header.js';
import C_Footer from '../../components/customer/C_Footer.js';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.1.jpg';

const MM_C_Menu = () => {

    const navigate = useNavigate();

    return (
        <div className={styles['product-page-container']}>

            {/* Header */}
            <C_Header />

            <div className={styles['tabs-container']}>
                <div className={styles['tab']}>Vegetable</div>
                <div className={styles['tab']}>Meat</div>
                <div className={styles['tab']}>Super</div>
                <div className={styles['tab']}>Other</div>
            </div>

            {/* Phần danh sách sản phẩm */}
            <div className={styles['product-grid']}>
                <div className={styles['product-card']}>
                    <img src={pizzaImg} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={styles['add-to-cart-btn']}>Add to cart</button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg2} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={styles['add-to-cart-btn']}>Add to cart</button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg3} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={styles['add-to-cart-btn']}>Add to cart</button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg4} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={styles['add-to-cart-btn']}>Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className={styles['pagination']}>
                <button className={styles['page-btn']}>1</button>
                <button className={styles['page-btn']}>2</button>
                <button className={styles['page-btn']}>&gt;</button>
            </div>
            <button className={styles['view-cart-btn']} onClick={() => navigate('/cart')}>View cart</button>
        
            {/* Footer */}
            <C_Footer />

        </div>
    );
};

export default MM_C_Menu;
