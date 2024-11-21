import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import styles from "../../styles/customer/CLoginRegister.module.css";
import logoImg from "../../assets/Image_C/logo.jpg";

const UM_C_Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "", // Đổi từ phone thành email
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8080/UM/create-user",
        formData
      );

      if (response.data.success) {
        message.success("Register successful! Redirecting to profile...");
        navigate("/home");
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
        <h1>Chizza</h1>

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
            <label htmlFor="username">Login Name:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your login name"
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
