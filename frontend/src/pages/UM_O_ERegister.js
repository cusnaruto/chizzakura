import React, { useState } from 'react';
import '../styles/register.css';
import logo from '../assets/Emu_02_st.ayaka.one.webp';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here, like form validation or sending the data to a server
    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-container">
      <div className="logo">
        <img src={logo} alt="Chizza Logo Here" />
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
            placeholder="username"
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
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
            placeholder="password"
            required
          />
        </div>
        <div className="form-group">
          <label>Repeat Password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="repeat password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
