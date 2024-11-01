import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/O_Header';
import '../styles/table.css';
import tableImage from '../assets/table_topview.png';

const TM_O_TableEdit = () => {
    // testtttttt
    const [tables, setTables] = useState([
        { id: 1, status: 'available', img: tableImage },
        { id: 5, status: 'available', img: tableImage },
        { id: 9, status: 'available', img: tableImage },
        { id: 2, status: 'available', img: tableImage },
        { id: 6, status: 'available', img: tableImage },
        { id: 10, status: 'available', img: tableImage },
        { id: 3, status: 'available', img: tableImage },
        { id: 7, status: 'available', img: tableImage },
        { id: 11, status: 'available', img: tableImage },
        { id: 4, status: 'available', img: tableImage },
        { id: 8, status: 'available', img: tableImage },
        { id: 12, status: 'available', img: tableImage }
    ]);

    const [deletedTables, setDeletedTables] = useState([]);

    const deleteTable = (id) => {
        setTables(tables.map(table => table.id === id ? { ...table, deleted: true } : table));
      };
    
      const addTable = (id) => {
        setTables(tables.map(table => table.id === id ? { ...table, deleted: false } : table));
      };


      return (
        <div>
          <Header />
          <div className="admin-table-container">
            <div className="content">
              <div className="table-grid">
                {tables.map((table) => (
                  table.deleted ? (
                    <button key={table.id} className="add-button" onClick={() => addTable(table.id)}>
                      Add Table {table.id}
                    </button>
                  ) : (
                    <div key={table.id} className={`table-edit-card ${table.status}`}>
                      <img src={table.img} alt={`Table ${table.id}`} className="table-image" />
                      <div className="table-number">{table.id}</div>
                      <button className="delete-button" onClick={() => deleteTable(table.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      );
};

export default TM_O_TableEdit;

// 1 5 9
// 2 6 10
// 3 7 11
// 4 8 12