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
    { id: 1, name: "Vegetable Pizza", price: 10, imageUrl: pizzaImg, rate: 8.5, numberRate: 30, quantity: 10, category: 'Pizza' },
    { id: 2, name: "Meat Pizza", price: 12, imageUrl: pizzaImg2, rate: 8, numberRate: 50, quantity: 15, category: 'Pizza' },
    { id: 3, name: "Super Pizza", price: 15, imageUrl: pizzaImg3, rate: 7.5, numberRate: 30, quantity: 10, category: 'Pizza' },
    { id: 4, name: 'Vegetable Pizza', price: 10, imageUrl: pizzaImg, rate: 8, numberRate: 30, quantity: 20, category: 'Pizza' },
    { id: 5, name: 'Meat Pizza', price: 20, imageUrl: pizzaImg2, rate: 8, numberRate: 50, quantity: 22, category: 'Pizza' },
    { id: 6, name: 'Cachua Pizza', price: 30, imageUrl: pizzaImg3, rate: 6.5, numberRate: 30, quantity: 10, category: 'Pizza' },
    { id: 7, name: 'Chicken Wings', price: 12, imageUrl: pizzaImg, rate: 6.5, numberRate: 30, quantity: 23, category: 'Chicken' },
    { id: 8, name: 'Grilled Chicken', price: 15, imageUrl: pizzaImg2, rate: 8, numberRate: 50, quantity: 10, category: 'Chicken' },
    { id: 9, name: 'Pasta', price: 8, imageUrl: pizzaImg3, rate: 6.5, numberRate: 100, quantity: 10, category: 'Food' },
    { id: 10, name: 'Only Chicken Food', price: 8, imageUrl: pizzaImg3, rate: 8, numberRate: 50, quantity: 24, category: 'Chicken' },
    { id: 11, name: 'Chicken Super Size', price: 7, imageUrl: pizzaImg4, rate: 6.5, numberRate: 50, quantity: 10, category: 'Chicken' },
    { id: 12, name: 'I dont know this food', price: 8, imageUrl: pizzaImg3, rate: 7, numberRate: 60, quantity: 14, category: 'Food' },
    { id: 13, name: 'Yasai', price: 7, imageUrl: pizzaImg4, rate: 6.5, numberRate: 70, quantity: 10, category: 'Food' },
    { id: 14, name: 'Nemui', price: 8, imageUrl: pizzaImg3, rate: 10, numberRate: 30, quantity: 17, category: 'Food' },
    { id: 15, name: 'Hasaki', price: 7, imageUrl: pizzaImg4, rate: 6.5, numberRate: 20, quantity: 10, category: 'Food' },
];

const OM_C_Cart = () => {

    const navigate = useNavigate();

    const onIncrement = (id) => {
        setItems((prevItems) => 
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    
    const onDecrement = (id) => {
        setItems((prevItems) => 
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    
    const onRemove = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };   

    const [category, setCategory] = useState('Pizza');
    const [items, setItems] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

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
                        <button className={styles['remove-btn']} onClick={() => onRemove(item.id)}>X</button>
                        <img src={item.imageUrl} alt={item.name} className={styles['product-img']} />
                        <div className={styles['product-info']}>
                            <span className={styles['product-price']}>${item.price}</span>
                            <h3 className={styles['product-name']}>{item.name}</h3>
                            <div className={styles['product-rating']}>
                                <span className={styles['product-rate']}>{item.rate}/10</span>
                                <span className={styles['product-number-rate']}>({item.numberRate} people)</span>
                            </div>
                            <div className={styles['quantity-controls']}>
                                <button onClick={onDecrement}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={onIncrement}>+</button>
                            </div>                    
                        </div>
                    </div>
                ))}
                
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
