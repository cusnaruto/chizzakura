import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

import pizzaImg from '../assets/Image_C/product_2.1.jpg';
import editImg from '../assets/Image_C/edit.png';

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
        <div className="order-confirmation">
            <div className="header">
                <button className="back-btn" onClick={() => navigate('/cart')}>←</button>
                <h2>Xác nhận đơn hàng</h2>
            </div>
            <div className="customer-info">
                <div className="title-info">
                    <p>
                        <strong>Thông tin người nhận:</strong>
                    </p>
                    <button className="edit-info-btn">
                        <img src={editImg} alt="editInfo" />
                    </button>
                </div>
                <p>{orderData.customerName} | {orderData.phoneNumber}</p>
                <p><strong>Vị trí bàn:</strong> {orderData.tableNumber}</p>
            </div>

            <hr />

            <div className="order-items">
                {orderData.items.map((item, index) => (
                <div key={index} className="order-item">
                    <img src={pizzaImg} alt="Pizza" className="pizza-img" />
                    <span>1x {item.name}</span>
                    <span>${item.price}</span>
                </div>
                ))}
            </div>

            <button className="view-all-btn">Xem tất cả</button>

            <div className="summary">
                <p>Tổng cộng: <span>${totalAmount}</span></p>
                <p>Giảm giá: <span>{orderData.discount}%</span></p>
                <p>Còn lại: <span>${discountedAmount}</span></p>
            </div>

            <div className="payment-method">
                <button 
                className={`payment-btn ${paymentMethod === 'cash' ? 'active' : ''}`} 
                onClick={() => setPaymentMethod('cash')}>
                Tiền mặt
                </button>
                <button 
                className={`payment-btn ${paymentMethod === 'qr' ? 'active' : ''}`} 
                onClick={() => setPaymentMethod('qr')}>
                QR Code
                </button>
            </div>

            <button className="send-order-btn">Send order</button>
        </div>
    );
};

export default OM_C_Checkout;
