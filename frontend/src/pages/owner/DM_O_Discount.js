import React, { useState, useEffect } from "react";
import Header from "../../components/O_Header";
import { FaEdit, FaTrash, FaSave, FaPlusCircle } from "react-icons/fa";
import styles from "../../styles/owner/list.module.css";
import axios from "axios";
import { format, parseISO } from "date-fns";
import URL from "../../url";
const DM_O_Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(`${URL}/DM/get-discounts`);
        const today = new Date();
        const discountsFormatted = response.data.map((discount) => ({
          ...discount,
          valid_from: formatDate(discount.valid_from),
          valid_until: formatDate(discount.valid_until),
          isValidDiscount: new Date(discount.valid_until) < today,
        }));
        setDiscounts(discountsFormatted);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchDiscounts();
  }, []);

  // Handle edit discount
  const handleEditClick = (discount) => {
    setCurrentDiscount(discount);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  // Add discount
  const handleAddClick = () => {
    setCurrentDiscount({
      id: "",
      discount_code: "",
      value: "",
      description: "",
      valid_from: "",
      valid_until: "",
    });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  // Delete discount
  const handleDeleteClick = (discount) => {
    axios
      .delete(`${URL}/DM/delete-discount/${discount.id}`)
      .then(() => {
        setDiscounts(discounts.filter((disc) => disc.id !== discount.id));
      })
      .catch((error) => {
        console.error("Error deleting discount: ", error);
      });
  };

  const handleValueChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0 || value > 1) {
      setError("Value must be between 0 and 1");
    } else {
      setError("");
      setCurrentDiscount({ ...currentDiscount, value: e.target.value });
    }
  };

  const handleSave = async () => {
    // Chuyển đổi valid_from và valid_until về định dạng chuẩn khi lưu
    const formattedDiscount = {
      ...currentDiscount,
      valid_from: new Date(currentDiscount.valid_from)
        .toISOString()
        .split("T")[0],
      valid_until: new Date(currentDiscount.valid_until)
        .toISOString()
        .split("T")[0],
    };

    try {
      let updatedDiscount;

      if (isAdding) {
        // Gửi yêu cầu tạo mới
        const response = await axios.post(
          `${URL}/DM/create-discount`,
          formattedDiscount
        );
        updatedDiscount = response.data;
        setDiscounts([...discounts, updatedDiscount]);
      } else {
        // Gửi yêu cầu cập nhật
        const response = await axios.put(
          `${URL}/DM/update-discount/${currentDiscount.id}`,
          formattedDiscount
        );
        updatedDiscount = response.data; // Lấy discount cập nhật từ response
        setDiscounts(
          discounts.map((disc) =>
            disc.id === updatedDiscount.id ? updatedDiscount : disc
          )
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without saving
  };

  return (
    <div>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.wrapper}>
          <h1 className={styles.centerText}>Discount Information</h1>
          <button className={styles.addBtn} onClick={handleAddClick}>
            ADD <FaPlusCircle />
          </button>
          <table className={styles.tblFull}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Discount Code</th>
                <th>Value</th>
                <th>Description</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr
                  key={discount.id}
                  className={
                    discount.isValidDiscount ? styles.invalidDiscount : ""
                  }
                >
                  <td>{discount.id}</td>
                  <td>{discount.discount_code}</td>
                  <td>{discount.value}</td>
                  <td>{discount.description}</td>
                  <td>{discount.valid_from}</td>
                  <td>{discount.valid_until}</td>
                  <td className={styles.actionCell}>
                    <FaEdit
                      className={styles.actionIcon}
                      onClick={() => handleEditClick(discount)}
                    />
                    <FaTrash
                      className={styles.actionIcon}
                      onClick={() => handleDeleteClick(discount)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing or adding discounts */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              {isAdding
                ? "Add Discount"
                : `Edit Discount ID: ${currentDiscount.id}`}
            </h2>
            <form>
              <div className={styles.formGroup}>
                <label>Discount Code:</label>
                <input
                  type="text"
                  value={currentDiscount.discount_code}
                  onChange={(e) =>
                    setCurrentDiscount({
                      ...currentDiscount,
                      discount_code: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Value:</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentDiscount.value}
                  onChange={handleValueChange}
                  // onChange={(e) => setCurrentDiscount({ ...currentDiscount, value: e.target.value })}
                />
                {error && <p className={styles.errorText}>{error}</p>}
              </div>
              <div className={styles.formGroup}>
                <label>Description:</label>
                <input
                  type="text"
                  value={currentDiscount.description}
                  onChange={(e) =>
                    setCurrentDiscount({
                      ...currentDiscount,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Valid From:</label>
                <input
                  type="date"
                  value={currentDiscount.valid_from}
                  onChange={(e) =>
                    setCurrentDiscount({
                      ...currentDiscount,
                      valid_from: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Valid Until:</label>
                <input
                  type="date"
                  value={currentDiscount.valid_until}
                  onChange={(e) =>
                    setCurrentDiscount({
                      ...currentDiscount,
                      valid_until: e.target.value,
                    })
                  }
                />
              </div>
            </form>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save <FaSave />
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DM_O_Discount;
