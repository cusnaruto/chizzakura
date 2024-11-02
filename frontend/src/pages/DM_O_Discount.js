import React, { useState, useEffect } from 'react';
import Header from '../components/O_Header';
import { FaEdit, FaTrash, FaSave, FaPlusCircle } from 'react-icons/fa';
import styles from '../styles/list.module.css';

const DM_O_Discount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDiscount, setCurrentDiscount] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    // test, see in web console
    useEffect(() => {
        //  Test calling the API to fetch data
        fetch("http://localhost:8080/UM/hello")
          .then((response) => {
              if (response.ok) {
                  console.log("Data fetched successfully");
              } else {
                  console.log("Failed to fetch data");
              }
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);


    // fake data
    useEffect(() => {
        // test data, replace with actual data from backend API
        const fakeDiscounts = [
            { id: 1, discount_code: 'DISC10', value: '10%', description: '10% off', valid_from: '2023-01-01', valid_until: '2023-12-31' },
            { id: 2, discount_code: 'DISC20', value: '20%', description: '20% off', valid_from: '2023-01-01', valid_until: '2023-12-31' },
        ];
        setDiscounts(fakeDiscounts);
    }, []);

    // Handle edit discount
    const handleEditClick = (discount) => {
        setCurrentDiscount(discount);
        setIsAdding(false); 
        setIsModalOpen(true);
    };

    // Add discount
    const handleAddClick = () => {
        setCurrentDiscount({ id: '', discount_code: '', value: '', description: '', valid_from: '', valid_until: '' });
        setIsAdding(true); 
        setIsModalOpen(true);
    };

    // Delete discount
    const handleDeleteClick = (discount) => {
        setDiscounts(discounts.filter((disc) => disc.id !== discount.id));
    };

    const handleSave = () => {
        if (isAdding) {
            setDiscounts([...discounts, currentDiscount]);
        } else {
            setDiscounts(discounts.map((disc) => (disc.id === currentDiscount.id ? currentDiscount : disc)));
        }
        setIsModalOpen(false); 
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
                                <tr key={discount.id}>
                                    <td>{discount.id}</td>
                                    <td>{discount.discount_code}</td>
                                    <td>{discount.value}</td>
                                    <td>{discount.description}</td>
                                    <td>{discount.valid_from}</td>
                                    <td>{discount.valid_until}</td>
                                    <td className={styles.actionCell}>
                                        <FaEdit className={styles.actionIcon} onClick={() => handleEditClick(discount)} />
                                        <FaTrash className={styles.actionIcon} onClick={() => handleDeleteClick(discount)} />
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
                        <h2>{isAdding ? 'Add Discount' : `Edit Discount ID: ${currentDiscount.id}`}</h2>
                        <form>
                            <div className={styles.formGroup}>
                                <label>Discount Code:</label>
                                <input
                                    type="text"
                                    value={currentDiscount.discount_code}
                                    onChange={(e) => setCurrentDiscount({ ...currentDiscount, discount_code: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Value:</label>
                                <input
                                    type="text"
                                    value={currentDiscount.value}
                                    onChange={(e) => setCurrentDiscount({ ...currentDiscount, value: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    value={currentDiscount.description}
                                    onChange={(e) => setCurrentDiscount({ ...currentDiscount, description: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Valid From:</label>
                                <input
                                    type="date"
                                    value={currentDiscount.valid_from}
                                    onChange={(e) => setCurrentDiscount({ ...currentDiscount, valid_from: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Valid Until:</label>
                                <input
                                    type="date"
                                    value={currentDiscount.valid_until}
                                    onChange={(e) => setCurrentDiscount({ ...currentDiscount, valid_until: e.target.value })}
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
