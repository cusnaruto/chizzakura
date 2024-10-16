const express = require("express");
const router = express.Router();
const {
  createUser,
  findUserByUsername,
} = require("../controllers/userController");

router.get("/", createUser);

router.get("/sample", findUserByUsername);

module.exports = router;
