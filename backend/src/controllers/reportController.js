const { Sequelize } = require("sequelize");
const Items = require("../model/Items");
const OrderDetail = require("../model/orderdetail");

const getItemReports = async (req, res) => {
  try {
    const itemReports = await OrderDetail.findAll({
      attributes: [
        "itemId",
        [Sequelize.col("Item.name"), "name"], 
        [Sequelize.col("Item.categoryid"), "category"], 
        [Sequelize.col("Item.price"), "price"], 
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "sales"], 
        [Sequelize.fn("SUM", Sequelize.col("total_price")), "total"], 
      ],
      include: [
        {
          model: Items,
          attributes: [], 
        },
      ],
      group: ["itemId", "Item.name", "Item.categoryid", "Item.price"], 
      raw: true,
    });

    res.status(200).json({ success: true, data: itemReports });
  } catch (error) {
    console.error("Error fetching item reports:", error);
    res.status(500).json({ success: false, message: "Failed to fetch item reports" });
  }
};

module.exports = { getItemReports };
