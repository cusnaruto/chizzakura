const express = require("express");
const router = express.Router();

const {
    createDiscount,
    getDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
  } = require("../controllers/discountsController");

router.post("/create-discount", createDiscount);
router.get("/get-discounts", getDiscounts);
router.get("/get-discount-by-id/:id", getDiscountById);
router.put("/update-discount/:id", updateDiscount);
router.delete("/delete-discount/:id", deleteDiscount);

module.exports = router;