import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/employee/EEditMenu.module.css";
import Header from "../../components/E_Header";
import URL_BE from "../../url";
const MM_E_EditMenu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch items and categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch items
        const itemsResponse = await axios.get(`${URL_BE}/IM/get-items`);
        setItems(itemsResponse.data);

        // Fetch categories
        const categoriesResponse = await axios.get(`${URL_BE}/IM/get-categories`);
        setCategories(categoriesResponse.data);

        // Set initial category
        if (categoriesResponse.data.length > 0) {
          setSelectedCategory(categoriesResponse.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = items.filter(
        (item) => item.categoryid === selectedCategory
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory, items]);

  const toggleAvailability = async (itemId, currentAvailability) => {
    try {
      await axios.put(`${URL_BE}/IM/update-item/${itemId}`, {
        is_available: !currentAvailability,
      });

      // Update local state
      setItems(
        items.map((item) =>
          item.id === itemId
            ? { ...item, is_available: !item.is_available }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating item availability:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Header />
      <div className={styles.editMenu}>
        <div className={styles.selectOptions}>
          <div className={styles.categorySelector}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={selectedCategory === cat.id ? styles.active : ""}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <h1>{categories.find((cat) => cat.id === selectedCategory)?.name}</h1>

        <div className={styles.menuItems}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.menuItem} ${
                !item.is_available ? styles.unavailable : ""
              }`}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p style={{ color: "red" }}>${item.price}</p>
              <label id="wrapper">
                <input
                  type="checkbox"
                  className={styles["switch-toggle"]}
                  checked={item.is_available}
                  onChange={() =>
                    toggleAvailability(item.id, item.is_available)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MM_E_EditMenu;
