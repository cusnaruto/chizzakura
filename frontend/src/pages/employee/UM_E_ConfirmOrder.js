import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/E_Header';
import styles from '../../styles/employee/ConfirmOrder.module.css';

const UM_O_Profile = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    // Fake data - replace with API call later
    const fakeOrderDetails = {
        id: orderId,
        table: '#5',
        status: 'CONFIRM',
        time: 'Jun 10, 2024 9:41 AM',
        items: [
            { id: 1, name: 'Vegetable Pizza', quantity: 2, price: 10.99, notes: 'Extra cheese' },
            { id: 2, name: 'Meat Pizza', quantity: 1, price: 12.99, notes: 'Spicy' },
            { id: 3, name: 'Chicken Wings', quantity: 3, price: 8.99, notes: '' }
        ],
        customerInfo: {
            name: 'John Doe',
            phone: '123-456-7890'
        },
        total: 62.94
    };

    useEffect(() => {
        // Simulate API call
        setOrderDetails(fakeOrderDetails);
    }, [orderId]);

    const handleStatusChange = (newStatus) => {
        setOrderDetails(prev => ({
            ...prev,
            status: newStatus
        }));
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Order #{orderDetails.id}</h1>
                
                <div className={styles.orderInfo}>
                    <div className={styles.infoRow}>
                        <span>Table:</span>
                        <span>{orderDetails.table}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span>Time:</span>
                        <span>{orderDetails.time}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span>Customer:</span>
                        <span>{orderDetails.customerInfo.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span>Phone:</span>
                        <span>{orderDetails.customerInfo.phone}</span>
                    </div>
                </div>

                <div className={styles.itemsContainer}>
                    <h2>Order Items</h2>
                    <table className={styles.itemsTable}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Notes</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>{item.notes || '-'}</td>
                                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.totalSection}>
                    <div className={styles.total}>
                        <span>Total Amount:</span>
                        <span>${orderDetails.total}</span>
                    </div>
                </div>

                <div className={styles.statusSection}>
                    <h2>Order Status: <span className={styles[orderDetails.status.toLowerCase()]}>
                        {orderDetails.status}
                    </span></h2>
                    <div className={styles.statusButtons}>
                        <button 
                            className={`${styles.statusButton} ${styles.confirm}`}
                            onClick={() => handleStatusChange('CONFIRM')}
                            disabled={orderDetails.status === 'CONFIRM'}
                        >
                            Confirm
                        </button>
                        <button 
                            className={`${styles.statusButton} ${styles.cooking}`}
                            onClick={() => handleStatusChange('COOKING')}
                            disabled={orderDetails.status === 'COOKING'}
                        >
                            Cooking
                        </button>
                        <button 
                            className={`${styles.statusButton} ${styles.done}`}
                            onClick={() => handleStatusChange('DONE')}
                            disabled={orderDetails.status === 'DONE'}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UM_O_Profile;