import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/customer/CMenuPage.module.css'; 
import { jwtDecode } from "jwt-decode";

import C_Header from '../../components/customer/C_Header.js';

const CI_C_RateItem = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    const [userId, setUserId] = useState(null);

    const [items, setItems] = useState([]);
    const [reviews, setReviews] = useState({});
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [averageRatings, setAverageRatings] = useState({});

    useEffect(() => {
        // TODO : fix avarage rating display
        //        fix rate item on new order id example: http://localhost:3000/rateFood?orderId=3
        //        something else i cant remember, 
        //        04:05:00 12/7/2024 




        // Get userId from localStorage or your auth system
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
                console.log("User ID from token:", decodedToken.id); // Debug log
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }

        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reviews/${orderId}`);
                
                // Group items by Item.id and calculate average ratings
                const itemsMap = new Map();
                
                response.data.forEach(item => {
                    const itemId = item.Item.id;
                    if (!itemsMap.has(itemId)) {
                        itemsMap.set(itemId, {
                            id: item.id,
                            Item: item.Item,
                            ratings: [],
                            comments: []
                        });
                    }
                    
                    if (item.rating) {
                        itemsMap.get(itemId).ratings.push(parseFloat(item.rating));
                    }
                    if (item.comment) {
                        itemsMap.get(itemId).comments.push(item.comment);
                    }
                });
        
                // Calculate averages and prepare final items array
                const uniqueItems = Array.from(itemsMap.values()).map(item => {
                    const avgRating = item.ratings.length > 0 
                        ? (item.ratings.reduce((a, b) => a + b, 0) / item.ratings.length).toFixed(1)
                        : null;
                    
                    setAverageRatings(prev => ({
                        ...prev,
                        [item.Item.id]: avgRating
                    }));
        
                    return {
                        ...item,
                        averageRating: avgRating
                    };
                });
        
                setItems(uniqueItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [orderId]);

    const handleSubmit = async () => {
        if (!userId) {
            alert('Please login to submit reviews');
            return;
        }
    
        try {
            // Validate ratings
            for (const itemId of Object.keys(reviews)) {
                const rating = reviews[itemId]?.rating;
                if (!rating || rating < 1 || rating > 5) {
                    alert(`Please provide a valid rating (1-5) for all items`);
                    return;
                }
            }
    
            const reviewPromises = Object.keys(reviews).map((itemId) => {
                const item = items.find(item => item.id === parseInt(itemId));
                if (!item) {
                    throw new Error(`Invalid item ID: ${itemId}`);
                }
    
                const review = {
                    orderId: parseInt(orderId),
                    itemId: item.Item.id, // Use the actual Item.id instead of the review ID
                    userId: parseInt(userId),
                    rating: parseFloat(reviews[itemId].rating),
                    comment: reviews[itemId].comment || ''
                };
                
                return axios.post('http://localhost:8080/reviews/create-review', review);
            });
    
            await Promise.all(reviewPromises);
            alert('Reviews submitted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting reviews:', error);
            const errorMessage = error.response?.data?.error || error.message;
            alert('Failed to submit reviews: ' + errorMessage);
        }
    };

    // Render stars based on rating
    const renderStars = (rating) => {
        const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
        return (
            <div className={styles['rating-stars']} title={`Rating: ${rating}/5`}>
                {stars}
                <span className={styles['rating-number']}>({rating})</span>
            </div>
        );
    };

    const handleRatingChange = (itemId, value) => {
        const rating = Math.min(Math.max(parseInt(value) || 0, 1), 5); // Ensure rating is between 1-5
        setReviews(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                rating: rating
            }
        }));
    };

    // Handle comment change
    const handleCommentChange = (itemId, comment) => {
        setReviews(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                comment: comment
            }
        }));
    };

    return (
        <div className={styles['product-page-container']}>
            <C_Header />
            <div className={styles['product-grid']}>
                {items.map((item) => (
                    <div key={item.id} className={styles['product-card']}>
                        <img src={item.Item.image} alt={item.Item.name} className={styles['product-img']} />
                        <div className={styles['product-info']}>
                            <h3 className={styles['product-name']}>{item.Item.name}</h3>
                            <span className={styles['product-price']}>${item.Item.price}</span>
                            <div className={styles['product-rating']}>
                                {item.averageRating && (
                                    <div className={styles['average-rating']}>
                                        {renderStars(item.averageRating)}
                                        <span className={styles['rating-label']}>Average Rating</span>
                                    </div>
                                )}
                                <div className={styles['rating-input']}>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={reviews[item.id]?.rating || '3'}
                                        onChange={(e) => handleRatingChange(item.id, e.target.value)}
                                        className={styles['rating-slider']}
                                    />
                                    <span className={styles['rating-value']}>
                                        {reviews[item.id]?.rating || '3'}/5
                                    </span>
                                </div>
                            </div>
                            <button 
                                className={styles['comment-button']}
                                onClick={() => {
                                    setShowCommentBox(prev => ({
                                        ...prev,
                                        [item.id]: !prev[item.id]
                                    }));
                                }}
                            >
                                {showCommentBox[item.id] ? 'Hide Comment' : 'Add Comment'}
                            </button>
                            {showCommentBox[item.id] && (
                                <textarea
                                    className={styles['comment-box']}
                                    placeholder="Write your comment here..."
                                    value={reviews[item.id]?.comment || ''}
                                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                                ></textarea>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className={styles['submit-button']}>
                Submit Reviews
            </button>
        </div>
    );
};

export default CI_C_RateItem;