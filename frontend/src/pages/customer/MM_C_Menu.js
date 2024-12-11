import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CMenuPage.module.css";
import C_Header from "../../components/customer/C_Header.js";
import C_Footer from "../../components/customer/C_Footer.js";
import axios from "axios";
import { useCart } from "../../contexts/CartContext.js";
import { message } from "antd";

const MM_C_Menu = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [category, setCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/IM/get-items");
        if (Array.isArray(response.data)) {
          setItems(response.data);
          //   console.log("Data fetched:", response.data);
        } else {
          console.error("Dữ liệu không hợp lệ:", response.data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setItems([]);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, []);

  // Fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/IM/get-categories"
        );
        if (Array.isArray(response.data)) {
          setCategories(response.data); // Lưu danh sách categories vào state
        } else {
          console.error("Dữ liệu categories không hợp lệ:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Nếu có lỗi, set danh sách categories thành mảng rỗng
      }
    };
    fetchCategories();
  }, []);

  const filteredItems = useMemo(
    () => items.filter((item) => item.categoryid === category), // Sử dụng categoryid để lọc items
    [items, category]
  );

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Đặt lại trang khi thay đổi category
  };

  const handleAddToCart = (item) => {
    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const existingItem = state.items.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: item.id, quantity: existingItem.quantity + 1 },
      });
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    }

    // Hiển thị thông báo thành công trên màn hình
    message.success(`${item.name} added to cart`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className={styles["product-page-container"]}>
      <C_Header />
      {error && <div className={styles["error-message"]}>{error}</div>}
      <div className={styles["tabs-container"]}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`${styles["tab"]} ${
              category === cat.id ? styles["active"] : ""
            }`}
            aria-label={`Select ${cat.id}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles["product-grid"]}>
          {currentItems.map((item) => (
            <div className={`${styles["product-card"]} ${!item.is_available ? styles["disabled"] : ""}`} key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className={styles["product-img"]}
                onError={(e) => (e.target.src = "fallback-image-url.jpg")}
              />
              <div className={styles["product-info"]}>
                <span className={styles["product-price"]}>${item.price}</span>
                <h3 className={styles["product-name"]}>{item.name}</h3>
                <div className={styles["product-rating"]}>
                  <span className={styles["product-rate"]}>{item.rate}/10</span>
                  <span className={styles["product-number-rate"]}>
                    ({item.numberRate} people)
                  </span>
                </div>
                <button
                  disabled={!item.is_available}
                  className={`${styles["add-to-cart-btn"]} ${!item.is_available ? styles["disabled"] : ""}`}
                  onClick={() => handleAddToCart(item)}                  
                  aria-label={`Add ${item.name} to cart`}
                >
                  {item.is_available ? (
                    <span>add to cart</span>
                  ) : (
                    <span>Unavailable</span>
                  )
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles["pagination"]}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${styles["page-btn"]} ${
              currentPage === index + 1 ? styles["active"] : ""
            }`}
            aria-label={`Go to page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className={styles["view-cart-btn"]}
        onClick={() => navigate("/cart")}
        aria-label="View cart"
      >
        View cart
      </button>
      <C_Footer />
    </div>
  );
};

export default MM_C_Menu;
