import React, { useState, useEffect } from "react";
import Header from "../../components/O_Header";
import { FaUserEdit, FaUserTimes, FaSave, FaPlusCircle } from "react-icons/fa";
import styles from "../../styles/owner/list.module.css";
import axios from "axios";

const UM_O_UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch users from API
    axios.get(`http://localhost:8080/UM/@`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  // Handle edit user
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  // Add user
  const handleAddClick = () => {
    setCurrentUser({
      id: "",
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "employee", // Default role
    });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  // Delete user
  const handleDeleteClick = (user) => {
    // Call delete API here
    fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((usr) => usr.id !== user.id));
      })
      .catch((err) => console.error("Failed to delete user", err));
  };

  // Save user
  const handleSave = () => {
    if (isAdding) {
      // Create new user via API
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((response) => response.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          setIsModalOpen(false);
        });
    } else {
      // Update user via API
      fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers(
            users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          setIsModalOpen(false);
        });
    }
  };

  // Cancel editing or adding
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Filter users by search query
  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.wrapper}>
          <h1 className={styles.centerText}>User Management</h1>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.addBtn} onClick={handleAddClick}>
            ADD <FaPlusCircle />
          </button>
          <table className={styles.tblFull}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td className={styles.actionCell}>
                    <FaUserEdit
                      className={styles.actionIcon}
                      onClick={() => handleEditClick(user)}
                    />
                    <FaUserTimes
                      className={styles.actionIcon}
                      onClick={() => handleDeleteClick(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing or adding users */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isAdding ? "Add User" : `Edit User ID: ${currentUser.id}`}</h2>
            <form>
              <div className={styles.formGroup}>
                <label>Username:</label>
                <input
                  type="text"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>First Name:</label>
                <input
                  type="text"
                  value={currentUser.firstName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={currentUser.lastName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role:</label>
                <select
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="employee">Employee</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </form>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save <FaSave />
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UM_O_UserManagement;
