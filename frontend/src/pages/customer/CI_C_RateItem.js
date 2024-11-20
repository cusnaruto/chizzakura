import React, { useState } from 'react';
import styles from '../../styles/customer/CMenuPage.module.css'; 

import C_Header from '../../components/customer/C_Header.js';
// import C_Footer from '../components/C_Footer.js';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.1.jpg';

const CI_C_RateItem = () => {

    const [showCommentBox, setShowCommentBox] = useState(false);

    const onComment = () => {
        setShowCommentBox(!showCommentBox); // Chuyển đổi hiển thị ô comment
    };

    return (
        <div className={styles['product-page-container']}>

            {/* Header */}
            <C_Header />

            {/* Phần danh sách sản phẩm */}
            <div className={`${styles['product-grid']} ${styles['product-rate']}`}>
                <div className={styles['product-card']}>
                    <img src={pizzaImg} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button 
                        className={`${styles['add-to-cart-btn']} ${styles['comment-btn']}`} 
                        onClick={onComment}>
                            Comment
                        </button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg2} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={`${styles['add-to-cart-btn']} ${styles['comment-btn']}`} onClick={onComment}>Comment</button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg3} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={`${styles['add-to-cart-btn']} ${styles['comment-btn']}`} onClick={onComment}>Comment</button>
                    </div>
                </div>
                <div className={styles['product-card']}>
                    <img src={pizzaImg4} alt="Meat Pizza" className={styles['product-img']} />
                    <div className={styles['product-info']}>
                        <span className={styles['product-price']}>$12</span>
                        <h3 className={styles['product-name']}>Meat Pizza</h3>
                        <div className={styles['product-rating']}>★★★★★</div>
                        <button className={`${styles['add-to-cart-btn']} ${styles['comment-btn']}`} onClick={onComment}>Comment</button>
                    </div>
                </div>
                {showCommentBox && (
                    <div className={styles['comment-box']}>
                        <textarea 
                            placeholder="Write your comment here..." 
                            className={styles['comment-textarea']}
                        ></textarea>
                        <button className={styles['submit-comment-btn']}>Submit</button>
                    </div>
                )}
            </div>

            {/* Phân trang */}
            <div className={styles['pagination']}>
                <button className={styles['page-btn']}>1</button>
                <button className={styles['page-btn']}>2</button>
                <button className={styles['page-btn']}>&gt;</button>
            </div>
            <button className={`${styles['view-cart-btn']} ${styles['save-btn']}`}>Save</button>
        
            {/* Footer */}
            <div className={styles['footer-page']}>
                <h2>Rate our foods!!!</h2>
            </div>

        </div>
    );
};

export default CI_C_RateItem;
