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

const getAllUsers = async (req, res) => {
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
};
