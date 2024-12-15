import React, { useEffect } from "react";
import { useCart } from "../../contexts/CartContext"; // Import useCart để lấy dữ liệu từ CartContext
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CMenuPage.module.css"; // Giả sử bạn có file CSS này
import C_Footer from "../../components/customer/C_Footer";
import C_Header from "../../components/customer/C_Header";

const OM_C_Cart = () => {
  const { state, dispatch } = useCart(); // Lấy state và dispatch từ CartContext
  const navigate = useNavigate();

  // Hàm xử lý thay đổi số lượng
  const handleQuantityChange = (id, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    });
  };

  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  // Hàm xử lý thanh toán
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles["product-page-container"]}>
      <C_Header />
      <h2 className={styles["page-title"]}>Your Cart</h2>
      <div className={styles["product-grid"]}>
        {state.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          state.items.map((item) => (
            <div key={item.id} className={`${styles["product-card"]} ${styles["product-sold"]}`}>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className={styles["remove-btn"]}
              >
                x
              </button>
              <img
                src={item.image}
                alt={item.name}
                className={styles["product-img"]}
              />
              <div className={styles["product-info"]}>
                <h3 className={styles["product-name"]}>{item.name}</h3>
                <span className={styles["product-price"]}>${item.price}</span>
                <div className={`${styles["quantity-controls"]}`}>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles["pagination"]}>
        <button onClick={handleCheckout} className={styles["check-out-btn"]}>
          Proceed to Checkout
        </button>
      </div>
      <C_Footer />
    </div>
  );
};

export default OM_C_Cart;
