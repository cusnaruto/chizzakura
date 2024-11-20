import React, { useState } from 'react';
import styles from '../styles/owner/auth.module.css';
import logo from '../assets/Emu_02_st.ayaka.one.webp';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login action
    console.log('Logging in with:', formData);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Chizza Logo" />
      </div>
      <h1>ChizzaKura</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="your username"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="your password"
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      {/* <div className={styles.signupLink}>
        <a href="/um_o_eregister">Sign up</a>
      </div> */}
    </div>
  );
};

export default Login;