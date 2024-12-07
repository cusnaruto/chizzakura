import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer/CProfile.module.css";

import defaultAvtPic from "../../assets/Image_C/default_avt.jpg";

import C_Footer from "../../components/customer/C_Footer";
import C_Header from "../../components/customer/C_Header";

const UM_C_Profile = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    Name: "Minh Tuan",
    Phone: "0987654321",
    Login_Name: "abc123",
    Password: "abc123",
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
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      alert("Save successfully");
    } catch (error) {
      console.error("Save failer", error);
      alert("Save failed");
    }
  };

  return (
    <div className={styles["profile-page"]}>
      {/* Header */}
      <C_Header />

      <div className={styles["profile-container"]}>
        <div className={styles["profile-pic"]}>
          <button
            className={styles["log-out-btn"]}
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("authToken");
            }}
          >
            Log out
          </button>
          <img src={userInfo.profilePic || defaultAvtPic} alt="profile" />
          <div className={styles["select-avt"]}>
            {/* <p>Tải lên từ máy của bạn</p> */}
            <label
              htmlFor="upload-input"
              className={`${styles["upload-input"]} ${styles["edit-image"]}`}
            >
              Tải lên từ máy của bạn
              <input
                type="file"
                id="upload-input"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
            {/* <p>của bạn</p> */}
            {/* <label htmlFor="upload-input" className={styles['upload-button"></label> */}

            {/* <div className={styles[]}>
                            
                        </div> */}
            <div className={styles["choose-btn"]}>
              <button className={styles["update-btn"]} onClick={hanldeSave}>
                Accept
              </button>
              <button className={styles["cancel-btn"]}>Cancel</button>
            </div>
          </div>
        </div>

        <hr />

        <div className={styles["user-info"]}>
          <h2 className={styles["title-user-info"]}>User Information</h2>

          <form className={styles["user-info-form"]}>
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value={userInfo.Name}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="text"
              name="Phone"
              value={userInfo.Phone}
              onChange={handleChange}
            />

            <label>Login Name</label>
            <input
              type="text"
              name="Login_Name"
              value={userInfo.Login_Name}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userInfo.Password}
              onChange={handleChange}
            />
          </form>
        </div>

        <button className={styles["save-btn"]} onClick={hanldeSave}>
          Save
        </button>
      </div>

      {/* Footer */}
      <C_Footer />
    </div>
  );
};

export default UM_C_Profile;
