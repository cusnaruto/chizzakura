import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/customer/CCheckout.module.css';

import pizzaImg from '../../assets/Image_C/product_2.1.jpg';
import editImg from '../../assets/Image_C/edit.png';

const OM_C_Checkout = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Tiền mặt mặc định
    const orderData = {
        customerName: 'Phạm Hoàng Anh',
        phoneNumber: '0987654321',
        tableNumber: 'Bàn số 3',
        items: [
        { name: 'Super Pizza', quantity: 1, price: 10 },
        { name: 'Super Pizza', quantity: 1, price: 10 },
        { name: 'Super Pizza', quantity: 1, price: 10 },
        { name: 'Super Pizza', quantity: 1, price: 10 },
        { name: 'Super Pizza', quantity: 1, price: 10 },
        ],
        discount: 50, // Giảm giá 50%
    };

    const totalAmount = orderData.items.reduce((total, item) => total + item.price, 0);
    const discountedAmount = totalAmount * (1 - orderData.discount / 100);

    return (
        <div className={styles['order-confirmation']}>
            <div class="header">
                <div class="arrow" onClick={() => navigate('/cart')}>←</div>
                <div>Xác nhận đơn hàng</div>
            </div>

            <hr />

            <div className={styles['customer-info']}>
                <div className={styles['title-info']}>
                    <p>
                        Thông tin khách hàng
                    </p>
                    <img src={editImg} alt="Edit" />
                </div>
                <p>{orderData.customerName} | {orderData.phoneNumber}</p>
                <p><strong>Vị trí bàn:</strong> {orderData.tableNumber}</p>
            </div>

            <hr />

            <div className={styles['order-items']}>
                {orderData.items.map((item, index) => (
                <div key={index} className={styles['order-item']}>
                    <img src={pizzaImg} alt="Pizza" className={styles['pizza-img']} />
                    <span>1x {item.name}</span>
                    <span>${item.price}</span>
                </div>
                ))}
            </div>

            <button className={styles['view-all-btn']}>Xem tất cả</button>

            <div className={styles['summary']}>
                <p>Tổng cộng: <span>${totalAmount}</span></p>
                <p>Giảm giá: <span>{orderData.discount}%</span></p>
                <p>Còn lại: <span>${discountedAmount}</span></p>
            </div>

            <div className={styles['payment-method']}>
                <button 
                className={`${styles['payment-btn']} ${paymentMethod === 'cash' ? 'active' : ''}`} 
                onClick={() => setPaymentMethod('cash')}>
                Tiền mặt
                </button>
                <button 
                className={`${styles['payment-btn']} ${paymentMethod === 'qr' ? 'active' : ''}`} 
                onClick={() => setPaymentMethod('qr')}>
                QR Code
                </button>
            </div>

            <button className={styles['send-order-btn']}>Send order</button>
        </div>
    );
};

export default OM_C_Checkout;
