import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/E_Header';
import styles from "../../styles/owner/table.module.css";
import tableImage from '../../assets/table_topview.png';

const UM_O_Profile = () => {
    const [tables, setTables] = useState([
        { id: 1, status: 'available', img: tableImage },
        { id: 5, status: 'occupied', img: tableImage },
        { id: 9, status: 'available', img: tableImage },
        { id: 2, status: 'available', img: tableImage },
        { id: 6, status: 'available', img: tableImage },
        { id: 10, status: 'occupied', img: tableImage },
        { id: 3, status: 'available', img: tableImage },
        { id: 7, status: 'available', img: tableImage },
        { id: 11, status: 'available', img: tableImage },
        { id: 4, status: 'occupied', img: tableImage },
        { id: 8, status: 'available', img: tableImage },
        { id: 12, status: 'available', img: tableImage }
    ]);
    
      const navigate = useNavigate();
    
      const toggleTableStatus = (id) => {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === id
              ? { ...table, status: table.status === 'occupied' ? 'available' : 'occupied' }
              : table
            )
          );
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
                    <img src={table.img} alt={`Table ${table.id}`} className={styles.tableImage} />
                    <div className={styles.tableNumber}>{table.id}</div>
                    </div>
                    ))}
            </div>
            </div>
        </div>
      </div>
      );
};

export default UM_O_Profile;