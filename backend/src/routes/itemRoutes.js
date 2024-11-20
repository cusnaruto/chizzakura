const express = require("express");
const router = express.Router();

const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
  } = require("../controllers/itemsController");

router.post("/create-item", createItem);
router.get("/get-items", getItems);
router.get("/get-item-by-id/:id", getItemById);
router.put("/update-item/:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

module.exports = router;