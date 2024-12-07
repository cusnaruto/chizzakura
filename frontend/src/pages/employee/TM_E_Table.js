import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Header from '../../components/E_Header';
import styles from "../../styles/owner/table.module.css";
import tableImage from '../../assets/table_topview.png';
import axios from 'axios';

const UM_O_Profile = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8080/TM/get-tables');
        const tableData = response.data.map((table) => ({
          id: table.id,
          table_number: table.table_number,
          status: table.is_available ? 'available' : 'occupied',
          img: tableImage,
        }));
        setTables(tableData);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  const toggleTableStatus = async (id) => {
    try {
      const table = tables.find(t => t.id === id);
      const newStatus = table.status === 'occupied' ? 'available' : 'occupied';
      
      // Update backend
      await axios.put(`http://localhost:8080/TM/update-table/${id}`, {
        is_available: newStatus === 'available'
      });

      // Update frontend state
      setTables(prevTables =>
        prevTables.map(table =>
          table.id === id
            ? { ...table, status: newStatus }
            : table
        )
      );
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  return (
  <div>
    <Header />
    <div className={styles.adminTableContainer}>
    <div className={styles.content}>
      <div className={styles.tableGrid}>
      {tables.map((table) => (
        <div
          key={table.id}
          className={`${styles.tableCard} ${table.status === 'occupied' ? styles.tableCardOccupied : styles.available}`}
          onClick={() => toggleTableStatus(table.id)}
        >
          <img src={table.img} alt={`Table ${table.table_number}`} className={styles.tableImage} />
          <div className={styles.tableNumber}>{table.table_number}</div>
        </div>
      ))}
      </div>
    </div>
    </div>
  </div>
  );
};

export default UM_O_Profile;