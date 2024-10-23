import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/O_Header';
import '../styles/table.css';
import tableImage from '../assets/table_topview.png';

const TM_O_TableEdit = () => {
    // testtttttt
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
            if (tables.some((table) => table.id === parseInt(newTableNumber))) {
            setError('Table number already exists.');
            return;
        }

        const newTable = {
        id: parseInt(newTableNumber),
        status: 'available',
        img: tableImage
        };
        setTables((prevTables) => [...prevTables, newTable]);
        setIsModalOpen(false);
        setNewTableNumber('');
        setError('');
    };

    return (
        <div>
        <Header />
        <div className="admin-table-container">
            <div className="edit-button-container">
            <button className="edit-button" onClick={() => setIsModalOpen(true)}>
                <FaPlus /> Add
            </button>
            </div>
            <div className="content">
                để mặc định là ... bàn r chỉnh availability của cái bài đó, bỏ add và delete
            <div className="table-grid">
                {tables.map((table) => (
                <div key={table.id} className={`table-card ${table.status}`}>
                    <img src={table.img} alt={`Table ${table.id}`} className="table-image" />
                    <div className="table-number">{table.id}</div>
                    <button className="delete-button" onClick={() => deleteTable(table.id)}>
                    <FaTrash />
                    </button>
                </div>
                ))}
            </div>
            </div>
        </div>
        {isModalOpen && (
            <div className="modal">
            <div className="modal-content">
                <h2>Add Table</h2>
                <form onSubmit={(e) => { e.preventDefault(); addTable(); }}>
                <div className="form-group">
                    <label htmlFor="tableNumber">Table Number</label>
                    <input
                    type="number"
                    id="tableNumber"
                    value={newTableNumber}
                    onChange={(e) => setNewTableNumber(e.target.value)}
                    required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="save-button">Add</button>
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
            </div>
            </div>
        )}
        </div>
    );
};

export default TM_O_TableEdit;