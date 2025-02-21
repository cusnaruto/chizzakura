const express = require("express");
const router = express.Router();
const authorizeRole = require("../middleware/roleMiddleware");

const {
  createUser,
  getAllUsers,
  updateUser,
  // updatePassword,
  loginUser,
  getUserById,
  getUserProfile,
  handleGoogleLogin,
  deleteUser,
} = require("../controllers/userController");

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.post('/google-login', handleGoogleLogin);
router.get("/@", getAllUsers);
router.get("/user-profile", getUserProfile);
router.get("/get-customer/:id", getUserById);
router.put("/update-customer/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
// router.put("/update-password/:id", updatePassword);

module.exports = router;
