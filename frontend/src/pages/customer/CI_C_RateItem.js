import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CRateItem.module.css";
import { jwtDecode } from "jwt-decode";
import C_Header from "../../components/customer/C_Header.js";
import URL from "../../url";

const CI_C_RateItem = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get(`${URL}/reviews/${orderId}`);
        setItems(response.data);

        // Initialize reviews state with item IDs
        const initialReviews = {};
        response.data.forEach((item) => {
          initialReviews[item.Item.id] = {
            // 5s or dam vo mom
            rating: 5,
            comment: "",
          };
        });
        setReviews(initialReviews);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [orderId]);

  const handleSubmit = async () => {
    if (!userId) {
      alert("Please login to submit reviews");
      return;
    }

    try {
      const reviewPromises = Object.keys(reviews).map((itemId) => {
        if (!reviews[itemId]?.rating) {
          throw new Error(`Please rate all items before submitting`);
        }

        return axios.post(`${URL}/reviews/create-review`, {
          orderId: parseInt(orderId),
          itemId: parseInt(itemId),
          userId: userId,
          rating: parseFloat(reviews[itemId].rating),
          comment: reviews[itemId].comment || "",
        });
      });

      await Promise.all(reviewPromises);
      alert("Reviews submitted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error submitting reviews:", error);
      alert("Failed to submit reviews: " + error.message);
    }
  };

  const handleRatingChange = (itemId, value) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rating: Math.min(Math.max(parseInt(value) || 0, 1), 5),
      },
    }));
  };

  const handleCommentChange = (itemId, comment) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        comment: comment,
      },
    }));
  };

  return (
    <div className={styles["product-page-container"]}>
      <C_Header />
      <div className={styles["product-grid"]}>
        {items.map((item) => (
          <div key={item.Item.id} className={styles["product-card"]}>
            <img
              src={item.Item.image}
              alt={item.Item.name}
              className={styles["product-img"]}
            />
            <div className={styles["product-info"]}>
              <h3 className={styles["product-name"]}>{item.Item.name}</h3>
              <p className={styles["product-price"]}>${item.Item.price}</p>
              <div className={styles["rating-input"]}>
                <div className={styles["star-rating"]}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`${styles["star-button"]} ${
                        star <= (reviews[item.Item.id]?.rating || 3)
                          ? styles["active"]
                          : ""
                      }`}
                      onClick={() => handleRatingChange(item.Item.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className={styles["rating-display"]}>
                  {reviews[item.Item.id]?.rating || 3}/5
                </span>
              </div>
              <button
                onClick={() =>
                  setShowCommentBox((prev) => ({
                    ...prev,
                    [item.Item.id]: !prev[item.Item.id],
                  }))
                }
              >
                {showCommentBox[item.Item.id] ? "Hide Comment" : "Add Comment"}
              </button>
              {showCommentBox[item.Item.id] && (
                <textarea
                  value={reviews[item.Item.id]?.comment || ""}
                  onChange={(e) =>
                    handleCommentChange(item.Item.id, e.target.value)
                  }
                  placeholder="Write your comment here..."
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className={styles["submit-button"]}>
        Submit Reviews
      </button>
    </div>
  );
};

export default CI_C_RateItem;
