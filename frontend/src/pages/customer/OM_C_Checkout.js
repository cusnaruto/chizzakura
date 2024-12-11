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
import { socket, userId, role } from '../../services/socket';

const OM_C_Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null); // Tiền mặt mặc định
  const { tableNumber } = useTable();
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isCashMethod, setIsCashMethod] = useState(false);
  const [qrTimer, setQrTimer] = useState(25);
  const [isQrCodeMethod, setIsQrCodeMethod] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  
  // ttin người dùng

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        const response = await axios.get("http://localhost:8080/UM/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (response.data) {
          setUserInfo(response.data); 
        } else {
          console.error("Error fetching user info:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user info:", error.response || error.message);
      }
    };
  
    fetchUserInfo();
  }, []);


  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/DM/get-discounts");
        if (response.data && response.data.length > 0) {
          // Lọc tất cả các discount hợp lệ
          const now = new Date();
          const validDiscounts = response.data.filter(d => {
            const validFrom = new Date(d.valid_from);
            const validUntil = new Date(d.valid_until);
            return now >= validFrom && now <= validUntil;
          });
        
          const combinedDiscount = validDiscounts.reduce((acc, discount) => {
            return acc + discount.value * 100;
          }, 0); 
        
          setDiscount(combinedDiscount);
        }
      } catch (error) {
        console.error("Error fetching discount bruh:", error);
        setDiscount(0);
      }
    };
    fetchDiscount();
  }, []);

  useEffect(() => {
    let timer;
    if (paymentMethod === "qr" && showModal) {
      timer = setInterval(() => {
        setQrTimer((prev) => {
          if (prev <= 1) {
            closeModal();
            setIsQrCodeMethod(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [paymentMethod, showModal]);

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Tính toán số tiền sau giảm giá
  const discountedAmount = totalPrice * (1 - (discount || 0) / 100);

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
  };

  const handleCashMethod = () => {
    setIsCashMethod(true);
    setShowModal(false);
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
        tableId: parseInt(tableNumber) || 3,
        total_price: parseFloat(discountedAmount.toFixed(2)),
        orderDetails: orderDetails,
        payment_method: paymentMethod,
        customerId: userId
      };

      console.log("paymentMethod:", paymentMethod);
  
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
        {userInfo ? (
          <div>
            <p>
              <strong>Tên:</strong> {userInfo.first_name} {userInfo.last_name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>
        ) : (
          <p>Không tìm thấy thông tin khách hàng</p>
        )}
        
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

      {/* <button className={styles["view-all-btn"]}>Xem tất cả</button> */}

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
          className={`${styles["payment-btn"]} ${ isQrCodeMethod ? styles["disabled-btn"] : "" }`}
          onClick={() => handleSelectPayment("cash")}
          disabled={isQrCodeMethod}
        >
          Tiền mặt
        </button>
        <button
          className={`${styles["payment-btn"]} ${ isCashMethod ? styles["disabled-btn"] : "" }`}
          onClick={() => handleSelectPayment("qr")}
          disabled={isCashMethod}
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
                Với phương thức thanh toán này, nhân viên sẽ tới bàn của bạn để thanh toán. Vui lòng ấn xác nhận bên dưới để đồng ý, số tiền cần thanh toán là:{" "}
                <strong>${discountedAmount.toFixed(2)}</strong>.
              </p>
            ) : (
              <div className={styles["qr-code-container"]}>
                <p>Quét mã QR để thanh toán số tiền:</p>
                <QRCode value={`So tien quy khach can thanh toan la: $${discountedAmount.toFixed(2)}`} />
                <p className={styles["qr-timer"]}>
                  Mã QR sẽ hết hạn sau: <strong>{qrTimer}</strong> giây.
                </p>
              </div>
            )}
            {paymentMethod === "cash" && (
              <button onClick={handleCashMethod} className={styles["confirm-btn"]}>
                Xác nhận
              </button>
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
