import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Header from "../../components/O_Header";
import styles from "../../styles/owner/table.module.css";
import tableImage from "../../assets/table_topview.png";
import axios from "axios";
import URL from "../../url";

const TM_O_TableEdit = () => {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${URL}/TM/get-tables`);
        const tableData = response.data.map((table) => ({
          id: table.id,
          img: tableImage,
        }));
        setTables(tableData);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  const deleteTable = (id) => {
    try {
      // Update backend
      axios.delete(`${URL}/TM/delete-table/${id}`);
      // Update frontend state
      setTables((prevTables) => prevTables.filter((table) => table.id !== id));
    } catch {
      console.error("Error deleting", error);
    }
  };

  const addTable = async () => {
    // TODO: Add table to backend by custom number, not auto-increment,
    //       Remove the auto-increment of the database, write a new migrate fle to do it.
    //       Try cố định table

    try {
      const tableNumber = parseInt(newTableNumber);

      // Check if table number already exists
      if (tables.some((table) => table.table_number === tableNumber)) {
        setError("Table number already exists.");
        return;
      }

      const response = await axios.post(`${URL}/TM/create-table`, {
        table_number: tableNumber,
      });

      // Create new table with data from response
      const newTable = {
        id: response.data.id,
        table_number: response.data.table_number,
        img: tableImage,
      };

      setTables((prevTables) => {
        const updatedTables = [...prevTables, newTable];
        return updatedTables.sort((a, b) => a.table_number - b.table_number);
      });

      setIsModalOpen(false);
      setNewTableNumber("");
      setError("");
    } catch (error) {
      console.error("Error adding table:", error);
      setError("Failed to add table");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.adminTableContainer}>
        <div className={styles.editButtonContainer}>
          <button
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.tableGrid}>
            {tables.map((table) => (
              <div
                key={table.id}
                className={`${styles.tableEditCard} ${styles[table.status]}`}
              >
                <img
                  src={table.img}
                  alt={`Table ${table.id}`}
                  className={styles.tableImage}
                />
                <div className={styles.tableNumber}>{table.id}</div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTable(table.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Table</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTable();
              }}
            >
              <div className={styles.formGroup}>
                <label htmlFor="tableNumber">Table Number</label>
                <input
                  type="number"
                  id="tableNumber"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.saveButton}>
                Add
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TM_O_TableEdit;
