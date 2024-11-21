const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  updateUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.get("/@", getAllUsers);
router.get("get-customer/:id", getUserById);
router.put("update-customer/:id", updateUser);

module.exports = router;
