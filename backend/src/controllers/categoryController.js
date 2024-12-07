// controllers/categoryController.js
const Category = require("../model/category.js");

// Tạo mới một Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category); // Trả về category mới được tạo
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating category." });
  }
};

// Lấy tất cả các Category
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    // console.log("categories:", categories);
    res.status(200).json(categories); // Trả về danh sách tất cả các category
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories." });
  }
};

// Cập nhật Category theo ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name || category.name; // Cập nhật tên category nếu có
    await category.save();

    res.status(200).json(category); // Trả về category đã cập nhật
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating category." });
  }
};

// Xóa Category theo ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy(); // Xóa category khỏi cơ sở dữ liệu
    res.status(204).send(); // Trả về response 204 No Content
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting category." });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
