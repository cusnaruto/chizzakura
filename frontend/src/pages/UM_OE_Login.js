import React, { useState } from 'react';
import '../styles/login.css';
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
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Chizza Logo" />
      </div>
      <h1>CHIZZA</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="your ủername"
            required
          />
        </div>
        <div className="form-group">
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
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="signup-link">
        <a href="/um_o_eregister">Sign up</a>
      </div>
    </div>
  );
};

export default Login;