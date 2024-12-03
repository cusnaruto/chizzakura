import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import styles from "../../styles/customer/CLoginRegister.module.css";

import logoImg from "../../assets/Image_C/logo.jpg";

const UM_C_Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  }); // Quản lý dữ liệu form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Cập nhật dữ liệu form
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form bị reload
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const response = await axios.post("http://localhost:8080/UM/login", {
        username: formData.username,
        password: formData.password,
      });
      
      if (response.data.token) {
        message.success("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        navigate("/home"); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        message.error("Login failed");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <img src={logoImg} alt="logo-page" />
        <h1>Chizza</h1>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div
            className={`${styles["user-login-name"]} ${styles["form-group"]}`}
          >
            <label htmlFor="username">Login Name:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your login name"
              value={formData.username}
              onChange={handleChange} // Lắng nghe sự thay đổi input
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
              onChange={handleChange} // Lắng nghe sự thay đổi input
              required
            />
          </div>

          <button
            type="submit"
            className={styles["login-btn"]}
            disabled={loading} // Ngăn người dùng nhấn khi đang loading
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
