import React, { useState, useEffect } from 'react';
import { FaAccessibleIcon, FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import styles from '../styles/employee/header.module.css';
import logo from '../assets/Emu_02_st.ayaka.one.webp';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle logout, add logic later based on the backend
    const handleLogout = () => {
        // Log out the user
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <nav className={styles.nav}>
                <NavLink to="/employee/om_e_listorder" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Order</NavLink>
                <NavLink to="/employee/tm_e_table" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Table</NavLink>
                <NavLink to="/employee/mm_e_editmenu" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Item</NavLink>
                <NavLink to="/employee/ci_e_chat" className={({ isActive }) => (isActive ? styles.activeLink : '')}>Chat</NavLink>
            </nav>
            <div className={styles.actions}>
                <div className={styles.search}>
                    <input type="text" placeholder="Search" className={styles.searchInput} />
                    <FaSearch className={styles.icon} />
                </div>
                <div className={styles.currentTime}>
                    {currentTime.toLocaleTimeString()}
                </div>
            </div>
            <span className={styles.employeeName}>John Doe</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FaAccessibleIcon className={styles.logoutIcon} />
            </button>
        </header>
    );
};

export default Header;