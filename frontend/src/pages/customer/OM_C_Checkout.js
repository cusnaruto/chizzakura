import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CCheckout.module.css";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";
import pizzaImg from "../../assets/Image_C/product_2.1.jpg";
import editImg from "../../assets/Image_C/edit.png";
import { useTable } from "../../contexts/TableContext";
import { socket, userId, role } from "../../services/socket";
import { set } from "date-fns";

const OM_C_Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { state: tableState, dispatch: tableDispatch } = useTable();

  const [discount, setDiscount] = useState(0);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [qrTimer, setQrTimer] = useState(90);
  const [userInfo, setUserInfo] = useState(null);
  const [isOrderSent, setIsOrderSent] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [VNDAmount, setVNDAmount] = useState(0);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8080/UM/user-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setUserInfo(response.data);
        } else {
          console.error("Error fetching user info:", response.error);
        }
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response || error.message
        );
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch discount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/DM/get-discounts"
        );
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

  const convertUSDtoVND = async (usdAmount) => {
    try {
      // Gọi API để lấy tỷ giá USD -> VND
      const response = await axios.get("https://open.er-api.com/v6/latest/USD");

      if (response.data && response.data.rates && response.data.rates.VND) {
        const rate = response.data.rates.VND; // Lấy tỷ giá USD -> VND
        const convertedAmount = Math.round(usdAmount * rate); // Chuyển đổi sang VNĐ (làm tròn số)

        // console.log(`Tỷ giá: 1 USD = ${rate} VND`);
        // console.log(
        //   `Số tiền chuyển đổi: ${usdAmount} USD = ${convertedAmount} VND`
        // );

        return convertedAmount;
      } else {
        console.error("Cannot get exchange rate:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi lấy tỷ giá:", error);
      return null;
    }
  };

  const handleSelectPayment = async (method) => {
    setPaymentMethod(method);
    setShowPaymentInfo(true);
    setVNDAmount(await convertUSDtoVND(discountedAmount));
    if (method === "cash") {
      setQrCodeUrl(null);
    } else if (method === "qr") {
      try {
        const bankInfo = {
          BANK_ID: "BIDV",
          ACCOUNT_NO: "4511129516",
          TEMPLATE: "compact2",
          ACCOUNT_NAME: "NGUYEN THAI DUONG",
          AMOUNT: VNDAmount,
          DESCRIPTION: `CHIZZAKURA Table ${parseInt(tableState.tableNumber)}`,
          format: "text",
        };
        let QR = `https://img.vietqr.io/image/${bankInfo.BANK_ID}-${bankInfo.ACCOUNT_NO}-${bankInfo.TEMPLATE}.png?amount=${bankInfo.AMOUNT}&addInfo=${bankInfo.DESCRIPTION}&accountName=${bankInfo.ACCOUNT_NAME}`;
        setQrCodeUrl(QR);
      } catch (error) {
        console.error("Error generating QR:", error);
        alert("Failed to generate QR code. Please try again.");
      }
    }
  };

  const handleSendOrder = async () => {
    try {
      if (!tableState.tableNumber) {
        alert("Vui lòng chọn số bàn trước khi đặt hàng.");
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
        total_price: parseFloat((item.price * item.quantity).toFixed(2)),
      }));
      const orderData = {
        tableId: parseInt(tableState.tableNumber) || 3,
        total_price: parseFloat(discountedAmount.toFixed(2)),
        orderDetails: orderDetails,
        payment_method: paymentMethod,
        customerId: userId,
      };
      console.log("paymentMethod:", paymentMethod);
      console.log("Sending order data:", orderData);

      const response = await axios.post("http://localhost:8080/OM/", orderData);

      if (paymentMethod === "qr" && response.data.success) {
        setQrTimer(900);
        const timer = setInterval(() => {
          setQrTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              console.log("Order created successfully:", response.data);
              dispatch({ type: "CLEAR_CART" });
              const messageContent = `
                Order created successfully!\n\n
                Your order contains:\n
                ${state.items
                  .map(
                    (item) => `${item.quantity}x ${item.name} - $${item.price}`
                  )
                  .join("\n")}\n\n
                Discount: ${discount}%\n
                Total: $${totalPrice}\n
                Payment Method: ${paymentMethod}\n
              `;
              // Send the message using socket.emit
              socket.emit("send_message", {
                token: localStorage.getItem("authToken"),
                room: userId,
                message: messageContent,
                sender_id: 2,
                time: new Date().toLocaleTimeString(),
              });
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
          const messageContent = `
            Order created successfully!\n\n
            Your order contains:\n
            ${state.items
              .map((item) => `${item.quantity}x ${item.name} - $${item.price}`)
              .join("\n")}\n\n
            Discount: ${discount}%\n
            Total: $${totalPrice}\n
            Payment Method: ${paymentMethod}\n
          `;
          // Send the message using socket.emit
          socket.emit("send_message", {
            token: localStorage.getItem("authToken"),
            room: userId,
            message: messageContent,
            sender_id: 2,
            time: new Date().toLocaleTimeString(),
          });
          // Get orderId from response
          const orderId = response.data.order.id;
          navigate(`/rateFood?orderId=${orderId}`);
        }, 7000);
      } else {
        console.error("Error creating order:", response.data.message);
        alert("Failed to create order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        "Failed to create order: " +
          (error.response?.data?.message || "Network error")
      );
    }
  };

  const handleDownloadQR = async () => {
    try {
      const imageResponse = await axios.get(qrCodeUrl, {
        responseType: "blob",
      });
      const blob = imageResponse.data;
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      console.error("Error downloading QR code:", error);
      alert("Failed to download QR code. Please try again.");
    }
  };

  return (
    <div className={styles["order-confirmation"]}>
      <div className={styles["header"]}>
        <div className={styles["arrow"]} onClick={() => navigate("/cart")}>
          ←
        </div>
        <div className={styles["title-checkout"]}>Confirm order</div>
      </div>

      <hr />

      <div className={styles["customer-info"]}>
        <div className={styles["title-info"]}>
          <p>Customer Information</p>
          <img src={editImg} alt="Edit" />
        </div>
        {userInfo ? (
          <div>
            <p>
              <strong>Name:</strong> {userInfo.first_name} {userInfo.last_name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>
        ) : (
          <p>Unable to fetch customer's information</p>
        )}

        <p>
          <strong>Table number:</strong>{" "}
          {tableState.tableNumber || "No table selected"}
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
          Total: <span>${totalPrice.toFixed(2)}</span>
        </p>
        <p>
          Discount: <span>{discount}%</span>
        </p>
        <p>
          Amount: <span>${discountedAmount.toFixed(2)}</span>
        </p>
      </div>

      <div className={styles["payment-method"]}>
        <button
          className={`${styles["payment-btn"]} ${
            isOrderSent ? styles["disabled-btn"] : ""
          }`}
          onClick={() => handleSelectPayment("cash")}
          disabled={isOrderSent}
        >
          Cash
        </button>
        <button
          className={`${styles["payment-btn"]} ${
            isOrderSent ? styles["disabled-btn"] : ""
          }`}
          onClick={() => handleSelectPayment("qr")}
          disabled={isOrderSent}
        >
          QR Code
        </button>
      </div>

      {showPaymentInfo && (
        <p className={styles["selected-method"]}>
          Chosen Method: {paymentMethod === "cash" ? "Cash" : "QR Code"}
        </p>
      )}

      {isProcessingPayment && paymentMethod === "qr" && (
        <div className={styles["qr-code-container"]}>
          <p>Scan the QR code to pay:</p>
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className={styles["qr-code-image"]}
            />
          ) : (
            <p>Generating QR...</p>
          )}
          <p>Expires in: {qrTimer} seconds.</p>
          <button
            onClick={handleDownloadQR}
            className={styles["download-qr-btn"]}
          >
            Download QR Code
          </button>
        </div>
      )}

      {isProcessingPayment && paymentMethod === "cash" && (
        <p>
          The employee will come shortly to check out. The amount you will need
          to pay is: <strong>{VNDAmount}VND</strong>.
        </p>
      )}

      <button
        className={styles["send-order-btn"]}
        onClick={handleSendOrder}
        disabled={isOrderSent}
      >
        Send order
      </button>
    </div>
  );
};

export default OM_C_Checkout;
