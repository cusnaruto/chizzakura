import React from "react";

import { useNavigate } from "react-router-dom";

import "../styles/LoginRegister.css";

import logoImg from "../assets/Image_C/logo.jpg";

const UM_C_Login = () => {

    const navigate = useNavigate();

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={logoImg} alt="logo-page" />
                <h1>Chizza</h1>

                <form className="login-form">
                    <div className="user-login-name form-group">
                        <label htmlFor="Login_Name">Login Name:</label>
                        <input
                            type="text"
                            name="Login_Name"
                            id="Login_Name"
                            placeholder="Enter your login name" 
                        />
                    </div>

                    <div className="user-password form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password" 
                        />
                    </div>
                                        
                    <button type="submit" className="login-btn" onClick={() => navigate('/profile')}>Login</button>

                    <div className="no-have-account">
                        <p>Don't have an account yet?</p>
                        <a href="/register">Register</a>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default UM_C_Login;