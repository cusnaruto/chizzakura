// orderController.js
const Order = require("../model/order.js");
const OrderDetail = require("../model/orderdetail.js");
const Table = require("../model/Table.js");

// Tạo một đơn hàng mới
const createOrder = async (req, res) => {
  const { tableId, total_price, orderDetails } = req.body;

  if (!tableId || !total_price || !Array.isArray(orderDetails)) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields: tableId, total_price, or orderDetails.",
    });
  }

  try {
    const order = await Order.create({ tableId, total_price });

    const details = await Promise.all(
      orderDetails.map(async (detail) => {
        const { itemId, quantity, unit_price, total_price } = detail;

        // Validate fields in each order detail
        if (!itemId || !quantity || !unit_price || !total_price) {
          throw new Error("Invalid order detail fields.");
        }

        return await OrderDetail.create({
          orderId: order.id,
          itemId,
          quantity,
          unit_price,
          total_price,
        });
      })
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
      orderDetails: details,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};

// Lấy danh sách tất cả các đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Table,
          attributes: ["id", "name"],
        },
        {
          model: OrderDetail,
          include: [
            {
              model: Item,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

// Lấy chi tiết một đơn hàng
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Table,
          attributes: ["id", "name"],
        },
        {
          model: OrderDetail,
          include: [
            {
              model: Item,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
};

// Xóa một đơn hàng
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Xóa chi tiết đơn hàng trước
    await OrderDetail.destroy({ where: { orderId: id } });

    // Xóa đơn hàng
    await order.destroy();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete order.",
    });
  }
};

// Xác nhận hoặc từ chối order
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xuất các hàm xử lý
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
};
