import React, { useState, useEffect } from 'react';
import Header from '../components/O_Header';
import { FaUserEdit, FaUserTimes, FaSave, FaPlusCircle } from 'react-icons/fa';
import styles from '../styles/list.module.css';

const UM_O_EditEInfo = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // test data, replace with actual data from backend API
        const fakeEmployees = [
            { id: 1, username: 'deez', email: 'ok@gmail.com', firstName: 'John', lastName: 'Doe' },
            { id: 2, username: 'nuts', email: 'a@gmail.com', firstName: 'Jane', lastName: 'Doe' },
        ];
        setEmployees(fakeEmployees);
    }, []);

    // Handle edit employee
    const handleEditClick = (employee) => {
        setCurrentEmployee(employee);
        setIsAdding(false); 
        setIsModalOpen(true);
    };

    // Add employee
    const handleAddClick = () => {
        setCurrentEmployee({ id: '', username: '', email: '', password: '', firstName: '', lastName: '' });
        setIsAdding(true); 
        setIsModalOpen(true);
    };

    // Delete employee
    const handleDeleteClick = (employee) => {
        setEmployees(employees.filter((emp) => emp.id !== employee.id));
    };

    const handleSave = () => {
        if (isAdding) {
            setEmployees([...employees, currentEmployee]);
        } else {
            setEmployees(employees.map((emp) => (emp.id === currentEmployee.id ? currentEmployee : emp)));
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
                    <h1 className={styles.centerText}>Employee Information</h1>
                    <button className={styles.addBtn} onClick={handleAddClick}>
                        ADD <FaPlusCircle />
                    </button>
                    <table className={styles.tblFull}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.username}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td className={styles.actionCell}>
                                        <FaUserEdit className={styles.actionIcon} onClick={() => handleEditClick(employee)} />
                                        <FaUserTimes className={styles.actionIcon} onClick={() => handleDeleteClick(employee)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for editing or adding employees */}
            {/* If isModalOpen is true, show the modal */}
            {/* If isAdding is true, show 'Add Employee' in the modal title */}
            {/* If isAdding is false, show 'Edit Employee ID: {currentEmployee.id}' in the modal title */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{isAdding ? 'Add Employee' : `Edit Employee ID: ${currentEmployee.id}`}</h2>
                        <form>
                            <div className={styles.formGroup}>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={currentEmployee.username}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, username: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={currentEmployee.email}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={currentEmployee.password}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, password: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    value={currentEmployee.firstName}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, firstName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    value={currentEmployee.lastName}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, lastName: e.target.value })}
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

export default UM_O_EditEInfo;
