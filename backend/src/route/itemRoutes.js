const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController");

const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.post("/create-item", createItem);
router.get("/get-items", getItems);
router.get("/get-item-by-id/:id", getItemById);
router.put("/update-item/:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

router.post("/create-category", createCategory);
router.get("/get-categories", getAllCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
