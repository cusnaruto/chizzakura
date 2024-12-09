import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CCheckout.module.css";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";
import pizzaImg from "../../assets/Image_C/product_2.1.jpg";
import editImg from "../../assets/Image_C/edit.png";
import { use } from "react";
import { useEffect } from "react";
import { useTable } from "../../contexts/TableContext";
import QRCode from "react-qr-code";

const OM_C_Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Tiền mặt mặc định
  const { tableNumber } = useTable();
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/DM/get-discounts");
        if (response.data && response.data.length > 0) {
          // Get the active discount
          const activeDiscount = response.data.find(d => {
            const now = new Date();
            const validFrom = new Date(d.valid_from);
            const validUntil = new Date(d.valid_until);
            return now >= validFrom && now <= validUntil;
          });
          
          // Convert decimal to percentage (e.g., 0.15 -> 15)
          setDiscount(activeDiscount ? activeDiscount.value * 100 : 0);
        }
      } catch (error) {
        console.error("Error fetching discount bruh:", error);
        setDiscount(0);
      }
    };
    fetchDiscount();
  }, []);

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  //handle send order
  const handleSendOrder = async () => {
    try {
      if (!tableNumber) {
        alert('No table selected! Please select a table first.');
        return;
      }
  
      if (state.items.length === 0) {
        alert('Cart is empty! Please add items before checking out.');
        return;
      }
  
      const orderDetails = state.items.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
        unit_price: parseFloat(item.price),
        total_price: parseFloat((item.price * item.quantity).toFixed(2))
      }));
  
      const orderData = {
        tableId: parseInt(tableNumber),
        total_price: parseFloat(discountedAmount.toFixed(2)),
        orderDetails: orderDetails,
        payment_method: paymentMethod
      };
  
      console.log("Sending order data:", orderData);
  
      const response = await axios.post("http://localhost:8080/OM/", orderData);
  
      if (response.data.success) {
        console.log("Order created successfully:", response.data);
        dispatch({ type: "CLEAR_CART" });
        
        // Get orderId from response
        const orderId = response.data.order.id;
        navigate(`/rateFood?orderId=${orderId}`);
      } else {
        console.error("Error creating order:", response.data.message);
        alert("Failed to create order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage = error.response?.data?.message || "Network error";
      alert("Failed to create order: " + errorMessage);
    }
  };

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Tính toán số tiền sau giảm giá
  const discountedAmount = totalPrice * (1 - (discount || 0) / 100);

  return (
    <div className={styles["order-confirmation"]}>
      <div className={styles["header"]}>
        <div className={styles["arrow"]} onClick={() => navigate("/cart")}>
          ←
        </div>
        <div className={styles["title-checkout"]}>Xác nhận đơn hàng</div>
      </div>

      <hr />

      <div className={styles["customer-info"]}>
        <div className={styles["title-info"]}>
          <p>Thông tin khách hàng</p>
          <img src={editImg} alt="Edit" />
        </div>
        <p>Phạm Hoàng Anh | 0987654321</p>
        <p>
          <strong>Bàn số:</strong> {tableNumber}
        </p>
      </div>

      <hr />

      <div className={styles["order-items"]}>
        {state.items.map((item, index) => (
          <div key={index} className={styles["order-item"]}>
            <img
              src={pizzaImg}
              alt={item.name}
              className={styles["pizza-img"]}
            />
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      <button className={styles["view-all-btn"]}>Xem tất cả</button>

      <div className={styles["summary"]}>
        <p>
          Tổng cộng: <span>${totalPrice.toFixed(2)}</span>
        </p>
        <p>
          Giảm giá: <span>{discount}%</span>
        </p>
        <p>
          Còn lại: <span>${discountedAmount.toFixed(2)}</span>
        </p>
      </div>

      <div className={styles["payment-method"]}>
        <button
          className={styles["payment-btn"]}
          onClick={() => handleSelectPayment("cash")}
        >
          Tiền mặt
        </button>
        <button
          className={styles["payment-btn"]}
          onClick={() => handleSelectPayment("qr")}
        >
          QR Code
        </button>
      </div>
      
      {showModal && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <h2>Thanh toán</h2>
            {paymentMethod === "cash" ? (
              <p>
                Quý khách vui lòng đợi nhân viên đến thanh toán. Số tiền cần thanh toán là:{" "}
                <strong>${discountedAmount.toFixed(2)}</strong>.
              </p>
            ) : (
              <div className={styles["qr-code-container"]}>
                <p>Quét mã QR để thanh toán số tiền:</p>
                <QRCode value={`Amount: ${discountedAmount.toFixed(2)}`} />
              </div>
            )}
            <button onClick={closeModal} className={styles["close-btn"]}>
              Đóng
            </button>
          </div>
        </div>     
      )}

      <button className={styles["send-order-btn"]} onClick={handleSendOrder}>
        Send order
      </button>
    </div>
  );
};

export default OM_C_Checkout;
