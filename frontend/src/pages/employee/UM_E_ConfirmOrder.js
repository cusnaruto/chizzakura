import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/E_Header";
import styles from "../../styles/employee/ConfirmOrder.module.css";
import axios from "axios";
import { socket } from "../../services/socket"; // Import the WebSocket connection and userId
import URL_BE from "../../url";

const UM_E_ConfirmOrder = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${URL_BE}/OM/${orderId}`);
        if (response.data.success) {
          const order = response.data.order;
          setCustomerId(order.customerId);
          console.log("order is", order);
          setOrderDetails({
            id: order.id,
            table: `#${order.tableId}`,
            status: order.status.toUpperCase(),
            time: new Date(order.createdAt).toLocaleString(),
            items: order.OrderDetails.map((detail) => ({
              id: detail.itemId,
              name: detail.Item.name,
              quantity: detail.quantity,
              price: detail.unit_price,
              total: detail.total_price,
            })),
            total: order.total_price,
          });
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`${URL_BE}/OM/update-status`, {
        orderId: orderId,
        status: newStatus.toLowerCase(),
      });

      setOrderDetails((prev) => ({
        ...prev,
        status: newStatus,
      }));
      const messageData = {
        token: localStorage.getItem("authToken"),
        room: customerId,
        message: `Your order is now ${newStatus}!`,
        sender_id: 2,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Order not found</div>;
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
        </div>

        <div className={styles.itemsContainer}>
          <h2>Order Items</h2>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.total.toFixed(2)}</td>
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
          <h2>
            Order Status:{" "}
            <span className={styles[orderDetails.status.toLowerCase()]}>
              {orderDetails.status}
            </span>
          </h2>
          <div className={styles.statusButtons}>
            <button
              className={`${styles.statusButton} ${styles.confirm}`}
              onClick={() => handleStatusChange("PENDING")}
              disabled={orderDetails.status === "PENDING"}
            >
              Confirm
            </button>
            <button
              className={`${styles.statusButton} ${styles.cooking}`}
              onClick={() => handleStatusChange("COMPLETED")}
              disabled={orderDetails.status === "COMPLETED"}
            >
              Complete
            </button>
            <button
              className={`${styles.statusButton} ${styles.done}`}
              onClick={() => handleStatusChange("CANCELLED")}
              disabled={orderDetails.status === "CANCELLED"}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UM_E_ConfirmOrder;
