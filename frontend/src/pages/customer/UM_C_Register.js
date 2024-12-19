import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useTable } from "../../contexts/TableContext";

import styles from "../../styles/customer/CLoginRegister.module.css";
import logoImg from '../../assets/Emu_02_st.ayaka.one.webp';

import URL_BE from "../../url";

const UM_C_Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useTable();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    // Get table number from URL or sessionStorage
    const params = new URLSearchParams(location.search);
    const tableNo = params.get("table_number") || sessionStorage.getItem("tableNo");
    if (tableNo) {
      dispatch({ type: "SET_TABLE_NUMBER", payload: tableNo });
      sessionStorage.setItem("tableNo", tableNo);
    }
  }, [location, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${URL_BE}/UM/create-user`, formData);

      if (response.data.success) {
        message.success("Register successful!");
        // Get table number before redirecting
        const tableNo = sessionStorage.getItem("tableNo");
        // Redirect to login with table number if exists
        if (tableNo) {
          navigate(`/login?table_number=${tableNo}`);
        } else {
          navigate("/login");
        }
      } else {
        message.error(response.data.message || "Register failed.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["register-page"]}>
      <div className={styles["register-container"]}>
        <img src={logoImg} alt="logo-page" />
        <h1>Chizzakura</h1>

        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          <div className={`${styles["user-name"]} ${styles["form-group"]}`}>
            <label htmlFor="first_name">First name:</label>
            <input
              type="text"
              name="first_name"
              id="first-name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles["user-name"]} ${styles["form-group"]}`}>
            <label htmlFor="last_name">Last name:</label>
            <input
              type="text"
              name="last_name"
              id="last-name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles["email"]} ${styles["form-group"]}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email" // Đổi type từ text sang email
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div
            className={`${styles["user-login-name"]} ${styles["form-group"]}`}
          >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles["user-password"]} ${styles["form-group"]}`}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={styles["register-btn"]}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className={styles["had-account"]}>
            <p>Have an account yet?</p>
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UM_C_Register;
