const express = require("express");
const router = express.Router();
const { getItemReports, getReportView, getRevenueReports } = require("../controllers/reportController");

router.get("/items-report", getItemReports);
router.get("/report-view", getReportView);
router.get("/revenue-report", getRevenueReports);
module.exports = router;