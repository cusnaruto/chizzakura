// orderRoute.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

// Định nghĩa các route liên quan đến order
router.post("/", createOrder); // Tạo một đơn hàng
router.get("/", getAllOrders); // Lấy danh sách tất cả đơn hàng
router.get("/:id", getOrderById); // Lấy chi tiết một đơn hàng
router.delete("/:id", deleteOrder); // Xóa một đơn hàng
router.put("/update-status", updateOrderStatus);

module.exports = router;
