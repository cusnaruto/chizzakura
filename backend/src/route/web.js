const express = require("express");
const router = express.Router();

const {
  createUser,
  findUserByUsername,
} = require("../controllers/userController");

const {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController");
router.post("/create-customer", createUser);

router.get("/sample", findUserByUsername);

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

router.post("/create-table", createTable);
router.get("/get-tables", getTables);
router.get("/get-table-by-id/:id", getTableById);
router.put("/update-table/:id", updateTable);
router.delete("/delete-table/:id", deleteTable);

router.post("/create-item", createItem);
router.get("/get-items", getItems);
router.get("/get-item-by-id/:id", getItemById);
router.put("/update-item/:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

module.exports = {
  router,
};
