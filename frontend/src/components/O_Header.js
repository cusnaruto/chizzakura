import React from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css'; // Import the CSS file
import logo from '../assets/Emu_02_st.ayaka.one.webp';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav">
        <NavLink to="/admin/mm_o_editmenu" className={({ isActive }) => (isActive ? 'active-link' : '')}>Menu</NavLink>
        <NavLink to="/admin/tm_o_table" className={({ isActive }) => (isActive ? 'active-link' : '')}>Table</NavLink>
        <NavLink to="/admin/um_o_editeinfo" className={({ isActive }) => (isActive ? 'active-link' : '')}>Employee Info</NavLink>
        <NavLink to="/admin/dm_o_discount" className={({ isActive }) => (isActive ? 'active-link' : '')}>Discount</NavLink>
        <NavLink to="/admin/br_o_report" className={({ isActive }) => (isActive ? 'active-link' : '')}>Report</NavLink>
      </nav>
      <div className="actions">
        {/* đây là thanh search, chưa cần thiết lắm nên để đó
        <div className="search">
          <input type="text" placeholder="Search" className="search-input" />
          <FaSearch className="icon" />
        </div> */}
        <NavLink to="/admin/um_o_profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaUserCircle className="user-icon" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;