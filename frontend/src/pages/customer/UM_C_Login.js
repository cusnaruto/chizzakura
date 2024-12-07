import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useTable } from "../../contexts/TableContext";
import styles from "../../styles/customer/CLoginRegister.module.css";
import logoImg from "../../assets/Image_C/logo.jpg";

const UM_C_Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableNumber, setTableNumber } = useTable();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tableNo = params.get('table_number');
    if (tableNo) {
      setTableNumber(tableNo);
    }
  }, [location, setTableNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/UM/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.data.token) {
        message.success("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("tableNumber", tableNumber);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <img src={logoImg} alt="logo-page" />
        <h1>Chizza</h1>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={`${styles["user-login-name"]} ${styles["form-group"]}`}>
            <label htmlFor="customer-login-username">Login Name:</label>
            <input
              type="text"
              name="username"
              id="customer-login-username"
              placeholder="Enter your login name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles["user-password"]} ${styles["form-group"]}`}>
            <label htmlFor="customer-login-password">Password:</label>
            <input
              type="password"
              name="password"
              id="customer-login-password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles["login-btn"]}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className={styles["no-have-account"]}>
            <p>Don't have an account yet?</p>
            <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UM_C_Login;