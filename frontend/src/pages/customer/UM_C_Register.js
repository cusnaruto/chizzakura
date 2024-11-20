import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../styles/customer/CLoginRegister.module.css";

import logoImg from "../../assets/Image_C/logo.jpg";

const UM_C_Register = () => {

    const navigate = useNavigate();

    return (
        <div className={styles['register-page']}>
            <div className={styles['register-container']}>
                <img src={logoImg} alt="logo-page" />
                <h1>Chizza</h1>

                <form className={styles['register-form']}>

                    <div className={`${styles['user-name']} ${styles['form-group']}`}>
                        <label htmlFor="Name">Name:</label>
                        <input
                            type="text"
                            name="Name"
                            id="Name"
                            placeholder="Enter your name" 
                        />
                    </div>

                    <div className={`${styles['phone']} ${styles['form-group']}`}>
                        <label htmlFor="Phone">Phone:</label>
                        <input
                            type="number"
                            name="Phone"
                            id="Phone"
                            placeholder="Enter your phone number" 
                        />
                    </div>

                    <div className={`${styles['user-login-name']} ${styles['form-group']}`}>
                        <label htmlFor="Login_Name">Login Name:</label>
                        <input
                            type="text"
                            name="Login_Name"
                            id="Login_Name"
                            placeholder="Enter your login name" 
                        />
                    </div>

                    <div className={`${styles['user-password']} ${styles['form-group']}`}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password" 
                        />
                    </div>
                                        
                    <button type="submit" className={styles['register-btn']} onClick={() => navigate('/profile')}>Register</button>

                    <div className={styles['had-account']}>
                        <p>Have an account yet?</p>
                        <a href="/login">Login</a>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default UM_C_Register;