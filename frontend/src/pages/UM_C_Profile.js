import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

import defaultAvtPic from '../assets/Image_C/default_avt.jpg';

import C_Footer from '../components/C_Footer';
import C_Header from '../components/C_Header';

const UM_C_Profile = () => {

    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState({
        Name: 'Minh Tuan',
        Phone: '0987654321',
        Login_Name: 'abc123',
        Password: 'abc123',
        profilePic: null,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = () => { 
                setUserInfo((prevInfo) => ({
                    ...prevInfo,
                    profilePic: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const hanldeSave = () => {
        try {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            alert('Save successfully');
        } catch (error) {
            console.error('Save failer', error);
            alert('Save failed');
        }
    };

    return (
        <div className="profile-page">
            {/* Header */}
            <C_Header />

            <div className="profile-container">
                <button className="log-out-btn" onClick={() => navigate('/login')}>Log out</button>
                <div className="profile-pic">
                    <img src={userInfo.profilePic || defaultAvtPic} alt="profile" />
                    <div className="select-avt">
                        <div className="edit-image">
                            <p>Tải lên từ </p>
                            <label htmlFor="upload-input" className='upload-input'>máy</label>
                            <p>của bạn</p>
                            {/* <label htmlFor="upload-input" className="upload-button"></label> */}
                            <input 
                                type="file" 
                                id="upload-input" 
                                onChange={handleImageUpload}
                                style = {{display: 'none'}}
                            />
                        </div>
                        <div className="choose-btn">
                            <button className="update-btn" onClick={hanldeSave}>Accept</button>
                            <button className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="user-info">
                    <h2 className='title-user-info'>User Information</h2>

                    <form className="user-info-form">

                        <label>Name</label>
                        <input
                            type='text'
                            name='Name'
                            value={userInfo.Name}
                            onChange={handleChange} 
                        />

                        <label>Phone</label>
                        <input
                            type='text'
                            name='Phone'
                            value={userInfo.Phone}
                            onChange={handleChange} 
                        />

                        <label>Login Name</label>
                        <input
                            type='text'
                            name='Login_Name'
                            value={userInfo.Login_Name}
                            onChange={handleChange} 
                        />

                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={userInfo.Password}
                            onChange={handleChange} 
                        />
                    </form>

                </div>

                <button className="save-btn" onClick={hanldeSave}>Save</button>

            </div>
            
            {/* Footer */}
            <C_Footer />
    
        </div>
    );
        
};

export default UM_C_Profile;
