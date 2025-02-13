import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Header from "../../components/O_Header";
import styles from "../../styles/owner/table.module.css";
import tableImage from "../../assets/table_topview.png";
import axios from "axios";
import URL_BE from "../../url";

const TM_O_Table = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${URL_BE}/TM/get-tables`);
        const tableData = response.data.map((table) => ({
          id: table.id,
          table_number: table.table_number,
          status: table.is_available ? "available" : "occupied",
          img: tableImage,
        }));
        setTables(tableData);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  const toggleTableStatus = async (id) => {
    try {
      const table = tables.find((t) => t.id === id);
      const newStatus = table.status === "occupied" ? "available" : "occupied";

      // Update backend
      await axios.put(`${URL_BE}/TM/update-table/${id}`, {
        is_available: newStatus === "available",
      });

      // Update frontend state
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === id ? { ...table, status: newStatus } : table
        )
      );
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.adminTableContainer}>
        <div className={styles.editButtonContainer}>
          <button
            className={styles.editButton}
            onClick={() => navigate("/admin/tm_o_tableedit")}
          >
            <FaEdit /> Edit
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.tableGrid}>
            {tables.map((table) => (
              <div
                key={table.id}
                className={`${styles.tableCard} ${
                  table.status === "occupied"
                    ? styles.tableCardOccupied
                    : styles.available
                }`}
                onClick={() => toggleTableStatus(table.id)}
              >
                <img
                  src={table.img}
                  alt={`Table ${table.table_number}`}
                  className={styles.tableImage}
                />
                <div className={styles.tableNumber}>{table.table_number}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TM_O_Table;
