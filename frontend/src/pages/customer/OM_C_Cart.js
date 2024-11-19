import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CMenuPage.module.css'; 

import C_Header from '../../components/customer/C_Header.js';
import C_Footer from '../../components/customer/C_Footer.js';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.1.jpg';

const sampleItems = [
    { id: 1, name: "Vegetable Pizza", price: 10, quantity: 15, imageUrl: pizzaImg, category: 'Pizza' },
    { id: 2, name: "Meat Pizza", price: 12, quantity: 16, imageUrl: pizzaImg2, category: 'Pizza' },
    { id: 3, name: "Super Pizza", price: 15, quantity: 157, imageUrl: pizzaImg3, category: 'Pizza' },
    { id: 4, name: "Other Pizza", price: 9, quantity: 18, imageUrl: pizzaImg4, category: 'Pizza' },
    { id: 5, name: 'Vegetable Pizza', price: 10, quantity: 20, imageUrl: pizzaImg, category: 'Pizza' },
    { id: 6, name: 'Meat Pizza', price: 20, quantity: 21, imageUrl: pizzaImg2, category: 'Pizza' },
    { id: 7, name: 'Cachua Pizza', price: 30, quantity: 11, imageUrl: pizzaImg3, category: 'Pizza' },
    { id: 8, name: 'Cheese Pizza', price: 10, quantity: 5, imageUrl: pizzaImg4, category: 'Pizza' },
    { id: 9, name: 'Chicken Wings', price: 12, quantity: 60, imageUrl: pizzaImg, category: 'Chicken' },
    { id: 10, name: 'Grilled Chicken', price: 15, quantity: 20, imageUrl: pizzaImg2, category: 'Chicken' },
    { id: 15, name: 'Pasta', price: 8, quantity: 12, imageUrl: pizzaImg3, category: 'Food' },
    { id: 16, name: 'Salad', price: 7, quantity: 1, imageUrl: pizzaImg4, category: 'Food' },
];

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

    const [category, setCategory] = useState('Pizza');
    const [items, setItems] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 4;

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setCurrentPage(1);
    };

    useEffect(() => {
        // Set items from sample data
        setItems(sampleItems);
    }, []);

    const filteredItems = items.filter(item => item.category === category);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className={styles['product-page-container']}>

            {/* Header */}
            <C_Header />

            <div className={styles['tabs-container']}>
                <button onClick={() => handleCategoryChange('Pizza')} className={`${styles['tab']} ${category === 'Pizza' ? styles['active'] : ''}`}>Pizza</button>
                <button onClick={() => handleCategoryChange('Chicken')} className={`${styles['tab']} ${category === 'Chicken' ? styles['active'] : ''}`}>Chicken</button>
                <button onClick={() => handleCategoryChange('Food')} className={`${styles['tab']} ${category === 'Food' ? styles['active'] : ''}`}>Food</button>
            </div>

            {/* Phần danh sách sản phẩm */}
            <div className={`${styles['product-grid']} ${styles['product-sold']}`}>
                {currentItems.map(item => (
                    <div className={styles['product-card']} key={item.id}>
                        <button className={styles['remove-btn']} onClick={onRemove}>X</button>
                        <img src={item.imageUrl} alt={item.name} className={styles['product-img']} />
                        <div className={styles['product-info']}>
                            <span className={styles['product-price']}>${item.price}</span>
                            <h3 className={styles['product-name']}>{item.name}</h3>
                            <div className={styles['product-rating']}>★★★★★</div>
                            <div className={styles['quantity-controls']}>
                                <button onClick={onDecrement}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={onIncrement}>+</button>
                            </div>                    
                        </div>
                    </div>
                ))}
                
                {/* <div className={styles['product-card']}>
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
                </div> */}
            </div>

            {/* Phân trang */}
            <div className={styles['pagination']}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`${styles['page-btn']} ${currentPage === index + 1 ? styles['active'] : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button className={styles['check-out-btn']} onClick={() => navigate('/checkout')}>Check out</button>
        
            {/* Footer */}
            <C_Footer />

        </div>
    );
};

export default OM_C_Cart;
