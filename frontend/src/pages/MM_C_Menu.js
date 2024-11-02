import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MenuPage.css'; 

import C_Header from '../components/C_Header.js';
import C_Footer from '../components/C_Footer.js';

const MM_C_Menu = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from the API
        axios.get('http://localhost:8888/UM/get-items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

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

            {/* Product list */}
            <div className="product-grid">
                {items.map(item => (
                    <div className="product-card" key={item.id}>
                        <img src={item.imageUrl} alt={item.name} className="product-img" />
                        <div className="product-info">
                            <span className="product-price">${item.price}</span>
                            <h3 className="product-name">{item.name}</h3>
                            <div className="product-rating">★★★★★</div>
                            <button className="add-to-cart-btn">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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