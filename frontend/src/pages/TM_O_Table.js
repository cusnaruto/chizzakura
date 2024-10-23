import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Header from '../components/O_Header';
import '../styles/table.css';
import tableImage from '../assets/table_topview.png';

const TM_O_Table = () => {

    // Test data for tables
    const [tables, setTables] = useState([
        { id: 1, status: 'occupied', img: tableImage },
        { id: 2, status: 'occupied', img: tableImage },
        { id: 3, status: 'available', img: tableImage },
        { id: 4, status: 'available', img: tableImage },
        { id: 5, status: 'occupied', img: tableImage },
        { id: 6, status: 'available', img: tableImage },
        { id: 7, status: 'available', img: tableImage },
        { id: 8, status: 'occupied', img: tableImage },
        { id: 9, status: 'available', img: tableImage },
        { id: 10, status: 'occupied', img: tableImage },
        { id: 11, status: 'available', img: tableImage },
        { id: 12, status: 'occupied', img: tableImage }
    ]);

    const navigate = useNavigate();

    // Function to toggle table status
    const toggleTableStatus = (id) => {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === id
                // change this depend on what write for table availability in the backend
              ? { ...table, status: table.status === 'occupied' ? 'available' : 'occupied' }
              : table
          )
        );
      };


    return (
    <div>
      <Header />
      <div className="admin-table-container">
        <div className="edit-button-container">
          <button className="edit-button" onClick={() => navigate('/admin/tm_o_tableedit')}>
            <FaEdit /> Edit
          </button>
        </div>
        <div className="content">
            <div className="table-grid">
                {tables.map((table) => (
                <div
                    key={table.id}
                    className={`table-card ${table.status === 'occupied' ? 'occupied' : 'available'}`}
                    onClick={() => toggleTableStatus(table.id)}
                >
                    <img src={table.img} alt={`Table ${table.id}`} className="table-image" />
                    <div className="table-number">{table.id}</div>
                </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TM_O_Table;