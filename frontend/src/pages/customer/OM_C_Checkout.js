import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CCheckout.module.css";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";
import pizzaImg from "../../assets/Image_C/product_2.1.jpg";
import editImg from "../../assets/Image_C/edit.png";
import { useTable } from "../../contexts/TableContext";
import QRCode from "react-qr-code";

const OM_C_Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { tableNumber } = useTable();
  const [discount, setDiscount] = useState(0);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [qrTimer, setQrTimer] = useState(20);
  const [userInfo, setUserInfo] = useState(null);
  const [isOrderSent, setIsOrderSent] = useState(false);

  // Fetch user info
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

  // Fetch discount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/DM/get-discounts");
        if (response.data && response.data.length > 0) {
          const now = new Date();
          const validDiscounts = response.data.filter((d) => {
            const validFrom = new Date(d.valid_from);
            const validUntil = new Date(d.valid_until);
            return now >= validFrom && now <= validUntil;
          });

          const combinedDiscount = validDiscounts.reduce((acc, discount) => {
            const discountValue = acc + discount.value * 100;
            return acc + discountValue > 100 ? 100 : discountValue;
          }, 0);

          setDiscount(combinedDiscount);
        }
      } catch (error) {
        console.error("Error fetching discount:", error);
        setDiscount(0);
      }
    };
    fetchDiscount();
  }, []);

  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountedAmount = totalPrice * (1 - (discount || 0) / 100);

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
    setShowPaymentInfo(true);
  };

  const handleSendOrder = async () => {
    try {
      if (!tableNumber) {
        alert("No table selected! Please select a table first.");
        return;
      }

      if (state.items.length === 0) {
        alert("Cart is empty! Please add items before checking out.");
        return;
      }

      if (!paymentMethod) {
        alert("Please select a payment method before sending order.");
        return;
      }

      setIsProcessingPayment(true);
      setIsOrderSent(true);

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
        payment_method: paymentMethod
      };

      console.log("paymentMethod:", paymentMethod);
      console.log("Sending order data:", orderData);

      const response = await axios.post("http://localhost:8080/OM/", orderData);


      if (paymentMethod === "qr" && response.data.success) {
        setQrTimer(20);
        const timer = setInterval(() => {
          setQrTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              console.log("Order created successfully:", response.data);
              dispatch({ type: "CLEAR_CART" });

              // Get orderId from response
              const orderId = response.data.order.id;
              navigate(`/rateFood?orderId=${orderId}`);
              // navigate("/rateFood?orderId=123");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (paymentMethod === "cash" && response.data.success) {
        setTimeout(() => {
          console.log("Order created successfully:", response.data);
          dispatch({ type: "CLEAR_CART" });

          // Get orderId from response
          const orderId = response.data.order.id;
          navigate(`/rateFood?orderId=${orderId}`);
        }, 20000);
      } else {
        console.error("Error creating order:", response.data.message);
        alert("Failed to create order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order: " + (error.response?.data?.message || "Network error"));
    }
  };

  return (
    <div className={styles["order-confirmation"]}>
      <div className={styles["header"]}>
        <div className={styles["arrow"]} onClick={() => navigate("/cart")}>←</div>
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
          className={`${styles["payment-btn"]} ${ isOrderSent ? styles["disabled-btn"] : ""}`}
          onClick={() => handleSelectPayment("cash")}
          disabled={isOrderSent}
        >
          Tiền mặt
        </button>
        <button
          className={`${styles["payment-btn"]} ${ isOrderSent ? styles["disabled-btn"] : ""}`}
          onClick={() => handleSelectPayment("qr")}
          disabled={isOrderSent}
        >
          QR Code
        </button>
      </div>

      {showPaymentInfo && (
        <p className={styles["selected-method"]}>
          Bạn đã chọn phương thức thanh toán: {paymentMethod === "cash" ? "Tiền mặt" : "QR Code"}
        </p>
      )}

      {isProcessingPayment && paymentMethod === "qr" && (
        <div className={styles["qr-code-container"]}>
          <p>Quét mã QR để thanh toán số tiền:</p>
          <QRCode value={`So tien quy khach can thanh toan la: $${discountedAmount.toFixed(2)}`} />
          <p>Mã QR sẽ hết hạn sau: {qrTimer} giây.</p>
        </div>
      )}

      {isProcessingPayment && paymentMethod === "cash" && (
        <p>
          Với phương thức thanh toán này, nhân viên sẽ tới bàn của bạn để thanh toán. Số tiền cần thanh toán là: <strong>${discountedAmount.toFixed(2)}</strong>.
        </p>
      )}

      <button className={styles["send-order-btn"]} onClick={handleSendOrder}>
        Send order
      </button>
    </div>
  );
};

export default OM_C_Checkout;
