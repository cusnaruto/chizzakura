require("dotenv").config();

const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const createUser = async (req, res) => {
  const { first_name, last_name, email, username, password, role } = req.body;

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mới user trong database
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      role,
      username,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Trả về kết quả
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: newUser.id,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Tạo token nếu đăng nhập thành công
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Ẩn mật khẩu khỏi kết quả trả về
    });

    console.log("user: ", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role, first_name, last_name } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cập nhật thông tin người dùng
    await user.update({
      username: username || user.username,
      email: email || user.email,
      role: role || user.role,
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

// const updatePassword = async (req, res) => {
//   const { id } = req.params;
//   const { oldPassword, newPassword } = req.body;
//   console.log("oldPassword: ", oldPassword);
//   console.log("newPassword: ", newPassword);
//   if (validatedOldPassword(id, oldPassword)) {
//     updatePassword(id, newPassword);
//     return res.status(200).json({ message: "Password updated successfully" });
//   } else {
//     return res.status(400).json({ message: "Incorrect old password" });
//   }
// }

const getAllUsers = async (req, res) => {
  console.log("Get all users");
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Ẩn mật khẩu khỏi kết quả trả về
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "username",
        "password",
      ],
    });
    // console.log("User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

const handleGoogleLogin = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;

    // Check if user exists by email
    let user = await User.findOne({ 
      where: { 
        email: email 
      }
    });

    if (!user) {
      // Create new user if doesn't exist
      const username = email.split('@')[0];
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        first_name,
        last_name,
        email,
        username,
        password: hashedPassword,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Error during Google login:", error);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUser,
  // updatePassword,
  loginUser,
  handleGoogleLogin,
};
