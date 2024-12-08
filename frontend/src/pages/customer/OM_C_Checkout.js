import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CCheckout.module.css";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";
import pizzaImg from "../../assets/Image_C/product_2.1.jpg";
import editImg from "../../assets/Image_C/edit.png";
import { use } from "react";
import { useEffect } from "react";
import QRCode from "react-qr-code";

const OM_C_Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const [discount, setDiscount] = useState(0);

  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
    // Lấy discount từ API
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/DM/get-discounts"
        );
        // console.log("Discount API response:", response.data);
        if (response.data) {
          setDiscount(response.data.discount);
        } else {
          console.error("Error fetching discount bruh:", response.error);
        }
      } catch (error) {
        console.error(
          "Error fetching discount:",
          error.response || error.message
        );
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
      // Chuẩn bị dữ liệu để gửi tới API
      const orderDetails = state.items.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const orderData = {
        tableId: "3",
        total_price: totalPrice,
        orderDetails,
      };

      console.log("Order data:", orderData);

      // Gửi request tới API
      const response = await axios.post("http://localhost:8080/OM/", orderData);

      if (response.data.success) {
        // Xử lý thành công
        console.log("Order created successfully:", response.data);
        dispatch({ type: "CLEAR_CART" }); // Xóa giỏ hàng
        navigate("/home"); // Chuyển hướng về trang chủ
      } else {
        console.error("Error creating order:", response.data.message);
      }
    } catch (error) {
      // Xử lý lỗi
      if (error.response) {
        console.error(
          "API Error:",
          error.response.data.message || error.response.data
        );
      } else {
        console.error("Request Error:", error.message);
      }
    }
  };

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Tính toán số tiền sau giảm giá
  const discountedAmount = totalPrice * (1 - discount / 100);

  return (
    <div className={styles["order-confirmation"]}>
      <div className="header">
        <div className="arrow" onClick={() => navigate("/cart")}>
          ←
        </div>
        <div>Xác nhận đơn hàng</div>
      </div>

      <hr />

      <div className={styles["customer-info"]}>
        <div className={styles["title-info"]}>
          <p>Thông tin khách hàng</p>
          <img src={editImg} alt="Edit" />
        </div>
        <div>
          {userInfo ? (
            <>
              <p>{`${userInfo.first_name} ${userInfo.last_name}`} | {userInfo.email}</p>
              <p>
                <strong>Vị trí bàn:</strong> Bàn số 3
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

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
