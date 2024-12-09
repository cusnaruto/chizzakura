const express = require("express");
const router = express.Router();
const { getItemReports, getReportView } = require("../controllers/reportController");

router.get("/items-report", getItemReports);
router.get("/report-view", getReportView);
module.exports = router;