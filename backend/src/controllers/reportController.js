const sequelize = require("../config/databaseConnection");
const Items = require("../model/Items");
const OrderDetail = require("../model/orderdetail");

const getItemReports = async (req, res) => {
  const { days } = req.query; // User selects timeframe in days, e.g., 7, 30, 90

  try {
    // Calculate the start date based on the timeframe in days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days || 30)); // Default to last 30 days if no timeframe is provided

    const query = `
      SELECT 
          i.id AS item_id,
          i.name AS item_name,
          c.name AS category_name,
          i.price AS item_price,
          SUM(od.quantity) AS total_sales,
          AVG(ir.rating) AS average_rating,
          COUNT(ir.rating) AS review_count
      FROM items i
      INNER JOIN categories c ON i.categoryId = c.id
      INNER JOIN orderdetails od ON i.id = od.itemId
      INNER JOIN orders o ON od.orderId = o.id
      LEFT JOIN itemreviews ir ON i.id = ir.itemId
      WHERE o.createdAt >= :startDate
      GROUP BY i.id, i.name, c.name, i.price;
    `;

    const itemReports = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { startDate },
    });

    res.status(200).json({ success: true, data: itemReports });
  } catch (error) {
    console.error("Error fetching item reports:", error);
    res.status(500).json({ success: false, message: "Failed to fetch item reports" });
  }
};



const getReportView = async (req, res) => {
  try {
    // Query the view directly
    const reportData = await sequelize.query("SELECT * FROM report_view", {
      type: sequelize.QueryTypes.SELECT,
    });

    // Send the data to the client
    res.status(200).json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    console.error("Error fetching report view:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch report data",
    });
  }
};


module.exports = { getItemReports, getReportView };
