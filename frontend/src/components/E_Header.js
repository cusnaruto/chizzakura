import React, { useState, useEffect } from 'react';
import { FaAccessibleIcon, FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import styles from '../styles/employee/header.module.css';
import logo from '../assets/Emu_02_st.ayaka.one.webp';
import { useNavigate } from "react-router-dom";
import { useTable } from "../contexts/TableContext";

const Header = () => {
    const navigate = useNavigate();
      const { state, dispatch } = useTable();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle logout, add logic later based on the backend
    const handleLogout = () => {
        dispatch({ type: "REMOVE_TABLE_NUMBER" });
        localStorage.removeItem("authToken");
        localStorage.removeItem("cart");
        sessionStorage.removeItem("tableNo");
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <nav className={styles.nav}>
                <NavLink to="/employee/listorder" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Order</NavLink>
                <NavLink to="/employee/table" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Table</NavLink>
                <NavLink to="/employee/menu" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Menu</NavLink>
                <NavLink to="/employee/chat" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Chat</NavLink>
            </nav>
            {/* <div className={styles.actions}>
                <div className={styles.search}>
                    <input type="text" placeholder="Search" className={styles.searchInput} />
                    <FaSearch className={styles.icon} />
                </div>
                <div className={styles.currentTime}>
                    {currentTime.toLocaleTimeString()}
                </div>
            </div> */}
            {/* <span className={styles.employeeName}>John Doe</span> */}
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FaAccessibleIcon className={styles.logoutIcon} />
            </button>
        </header>
    );
};

export default Header;