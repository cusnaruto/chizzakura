const express = require("express");
const router = express.Router();
const { getItemReports } = require("../controllers/reportController");

router.get("/items-report", getItemReports);

module.exports = router;