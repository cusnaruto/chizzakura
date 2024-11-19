import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CMenuPage.module.css';

import C_Header from '../../components/customer/C_Header.js';
import C_Footer from '../../components/customer/C_Footer.js';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg3 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.1.jpg';

// Sample data array
const sampleItems = [
    { id: 1, name: "Vegetable Pizza", price: 10, imageUrl: pizzaImg, category: 'Pizza' },
    { id: 2, name: "Meat Pizza", price: 12, imageUrl: pizzaImg2, category: 'Pizza' },
    { id: 3, name: "Super Pizza", price: 15, imageUrl: pizzaImg3, category: 'Pizza' },
    { id: 4, name: "Other Pizza", price: 9, imageUrl: pizzaImg4, category: 'Pizza' },
    { id: 5, name: 'Vegetable Pizza', price: 10, imageUrl: pizzaImg, category: 'Pizza' },
    { id: 6, name: 'Meat Pizza', price: 20, imageUrl: pizzaImg2, category: 'Pizza' },
    { id: 7, name: 'Cachua Pizza', price: 30, imageUrl: pizzaImg3, category: 'Pizza' },
    { id: 8, name: 'Cheese Pizza', price: 10, imageUrl: pizzaImg4, category: 'Pizza' },
    { id: 9, name: 'Chicken Wings', price: 12, imageUrl: pizzaImg, category: 'Chicken' },
    { id: 10, name: 'Grilled Chicken', price: 15, imageUrl: pizzaImg2, category: 'Chicken' },
    { id: 15, name: 'Pasta', price: 8, imageUrl: pizzaImg3, category: 'Food' },
    { id: 16, name: 'Salad', price: 7, imageUrl: pizzaImg4, category: 'Food' },
];

const MM_C_Menu = () => {

    const navigate = useNavigate();

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

            {/* Product list */}
            <div className={styles['product-grid']}>
                {currentItems.map(item => (
                    <div className={styles['product-card']} key={item.id}>
                        <img src={item.imageUrl} alt={item.name} className={styles['product-img']} />
                        <div className={styles['product-info']}>
                            <span className={styles['product-price']}>${item.price}</span>
                            <h3 className={styles['product-name']}>{item.name}</h3>
                            <div className={styles['product-rating']}>★★★★★</div>
                            <button className={styles['add-to-cart-btn']}>Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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
            <button className={styles['view-cart-btn']} onClick={() => navigate('/cart')}>View cart</button>
        
            {/* Footer */}
            <C_Footer />
        </div>
    );
};

export default MM_C_Menu;
