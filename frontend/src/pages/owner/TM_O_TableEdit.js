import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../../components/O_Header';
import styles from '../../styles/owner/table.module.css';
import tableImage from '../../assets/table_topview.png';

const TM_O_TableEdit = () => {
    const [tables, setTables] = useState([
      { id: 1, status: 'available', img: tableImage },
      { id: 2, status: 'available', img: tableImage },
      { id: 3, status: 'available', img: tableImage },
      { id: 4, status: 'available', img: tableImage },
      { id: 5, status: 'available', img: tableImage },
      { id: 6, status: 'available', img: tableImage },
      { id: 7, status: 'available', img: tableImage },
      { id: 8, status: 'available', img: tableImage },
      { id: 9, status: 'available', img: tableImage },
      { id: 10, status: 'available', img: tableImage }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [error, setError] = useState('');

  const deleteTable = (id) => {
      setTables((prevTables) => prevTables.filter((table) => table.id !== id));
  };

  const addTable = () => {
    const tableNumber = parseInt(newTableNumber);
    
    // Check if table number already exists
    if (tables.some((table) => table.id === tableNumber)) {
        setError('Table number already exists.');
        return;
    }

    // Create new table
    const newTable = {
        id: tableNumber,
        status: 'available',
        img: tableImage
    };

    // Add new table to the list and sort by id
    setTables((prevTables) => {
        const updatedTables = [...prevTables, newTable];
        // Sort the table list by id
        return updatedTables.sort((a, b) => a.id - b.id);
    });

    // Close modal and reset input
    setIsModalOpen(false);
    setNewTableNumber('');
    setError('');
  };


  return (
      <div>
      <Header />
      <div className={styles.adminTableContainer}>
          <div className={styles.editButtonContainer}>
            <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
                <FaPlus /> Add
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.tableGrid}>
                {tables.map((table) => (
                <div key={table.id} className={`${styles.tableEditCard} ${styles[table.status]}`}>
                    <img src={table.img} alt={`Table ${table.id}`} className={styles.tableImage} />
                    <div className={styles.tableNumber}>{table.id}</div>
                    <button className={styles.deleteButton} onClick={() => deleteTable(table.id)}>
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
                <form onSubmit={(e) => { e.preventDefault(); addTable(); }}>
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
                <button type="submit" className={styles.saveButton}>Add</button>
                <button type="button" className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
            </div>
          </div>
      )}
      </div>
  );
};

export default TM_O_TableEdit;
