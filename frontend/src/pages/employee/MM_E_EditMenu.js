
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from '../../styles/employee/EEditMenu.module.css';

import pizzaImg1 from '../../assets/Image_C/product_2.2.jpg';
import pizzaImg2 from '../../assets/Image_C/product_2.3.jpg';
import pizzaImg3 from '../../assets/Image_C/product_3.1.jpg';
import pizzaImg4 from '../../assets/Image_C/product_3.2.jpg';

import Header from '../../components/O_Header';

const MM_E_EditMenu = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState('Pizza');
    const [items, setItems] = useState([
        { id: 1, name: 'Vegetable Pizza', price: 10, img: pizzaImg1, available: true, category: 'Pizza' },
        { id: 2, name: 'Meat Pizza', price: 20, img: pizzaImg2, available: true, category: 'Pizza' },
        { id: 3, name: 'Cachua Pizza', price: 30, img: pizzaImg3, available: true, category: 'Pizza' },
        { id: 4, name: 'Cheese Pizza', price: 10, img: pizzaImg4, available: true, category: 'Pizza' },
        { id: 5, name: 'Vegetable Pizza', price: 10, img: pizzaImg1, available: true, category: 'Pizza' },
        { id: 6, name: 'Meat Pizza', price: 20, img: pizzaImg2, available: true, category: 'Pizza' },
        { id: 7, name: 'Cachua Pizza', price: 30, img: pizzaImg3, available: true, category: 'Pizza' },
        { id: 8, name: 'Cheese Pizza', price: 10, img: pizzaImg4, available: true, category: 'Pizza' },
        { id: 9, name: 'Chicken Wings', price: 12, img: pizzaImg1, available: true, category: 'Chicken' },
        { id: 10, name: 'Grilled Chicken', price: 15, img: pizzaImg2, available: true, category: 'Chicken' },
        { id: 11, name: 'Chicken Wings', price: 12, img: pizzaImg1, available: true, category: 'Chicken' },
        { id: 12, name: 'Super Chicken', price: 15, img: pizzaImg2, available: true, category: 'Chicken' },
        { id: 13, name: 'Chicken Wings', price: 12, img: pizzaImg1, available: true, category: 'Chicken' },
        { id: 14, name: 'American Chicken', price: 15, img: pizzaImg2, available: true, category: 'Chicken' },
        { id: 15, name: 'Pasta', price: 8, img: pizzaImg3, available: true, category: 'Food' },
        { id: 16, name: 'Salad', price: 7, img: pizzaImg4, available: true, category: 'Food' },
    ]);

    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {

        setFilteredItems(items.filter(item => item.category === category));

    }, [category, items]);

    const toggleAvailability = (id) => {
        setItems(items.map(item => 
          item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div className={styles.editMenu}>
            <Header />

            <div className={styles.categorySelector}>
                <button onClick={() => handleCategoryChange('Pizza')} className={category === 'Pizza' ? styles.active : ''}>Pizza</button>
                <button onClick={() => handleCategoryChange('Chicken')} className={category === 'Chicken' ? styles.active : ''}>Chicken</button>
                <button onClick={() => handleCategoryChange('Food')} className={category === 'Food' ? styles.active : ''}>Food</button>
            </div>
            
            <h1>{category}</h1>

            <div className={styles.menuItems}>
                {filteredItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`${styles.menuItem} ${!item.available ? styles.unavailable : ''}`}
                    >
                        <img src={item.img} alt={item.name} />
                        <p>{item.name}</p>
                        <p style={{ color: 'red' }}>${item.price}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.available}
                                onChange={() => toggleAvailability(item.id)}
                            />
                        </label>
                    </div>
                ))}
            </div>

            <div className={styles.saveMenu}>
                <button onClick={() => navigate('/employee/menu')}>Save</button>
            </div>
        </div>
    );
};

export default MM_E_EditMenu;

