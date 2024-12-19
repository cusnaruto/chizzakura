import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/customer/CItemDetail.module.css";
import C_Header from "../../components/customer/C_Header";
import C_Footer from "../../components/customer/C_Footer";
import { useCart } from "../../contexts/CartContext";
import { message } from "antd";
import URL_BE from "../../url";

const CI_C_ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useCart();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemResponse, reviewsResponse] = await Promise.all([
          axios.get(`${URL_BE}/IM/get-item-by-id/${itemId}`),
          axios.get(`${URL_BE}/reviews/item/${itemId}`),
        ]);

        setItem(itemResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  // Hide or show the header when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleAddToCart = () => {
    if (!item.is_available) return;

    const existingItem = state.items.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: item.id, quantity: existingItem.quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    }

    message.success(`${item.name} added to cart`);
  };

  if (loading) {
    return <div className={styles["loading"]}>Loading...</div>;
  }

  if (!item) {
    return <div className={styles["error"]}>Item not found</div>;
  }

  return (
    <div className={styles["page-container"]}>
      <C_Header />
      <div className={styles["content"]}>
        <button
          className={styles["back-button"]}
          onClick={() => navigate("/menu")}
        >
          ← Back to Menu
        </button>
        <div className={styles["item-container"]}>
          <div className={styles["image-container"]}>
            <img
              src={item.image}
              alt={item.name}
              className={styles["item-image"]}
            />
          </div>
          <div className={styles["details-container"]}>
            <h1 className={styles["item-name"]}>{item.name}</h1>
            <p className={styles["item-price"]}>${item.price}</p>
            {item.description && (
              <p className={styles["item-description"]}>{item.description}</p>
            )}
            <div className={styles["rating-container"]}>
              <span className={styles["rating"]}>
                ★ {reviews.averageRating?.toFixed(1) || "N/A"}
              </span>
              <span className={styles["review-count"]}>
                ({reviews.totalReviews || 0} reviews)
              </span>
            </div>
            <button
              className={`${styles["add-to-cart-btn"]} ${
                !item.is_available ? styles["disabled"] : ""
              }`}
              onClick={handleAddToCart}
              disabled={!item.is_available}
            >
              {item.is_available ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles["reviews-section"]}>
          <h2>Customer Reviews</h2>
          <div className={styles["reviews-list"]}>
            {reviews.reviews?.map((review) => (
              <div className={styles["review-card"]}>
                <div className={styles["review-header"]}>
                  <div className={styles["reviewer-info"]}>
                    <h3>{review.User.name}</h3>
                    <div className={styles["review-rating"]}>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <span className={styles["review-time"]}>
                      {review.createdAt}
                    </span>
                  </div>
                </div>
                {review.comment && (
                  <p className={styles["review-comment"]}>{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <C_Footer />
    </div>
  );
};

export default CI_C_ItemDetail;
