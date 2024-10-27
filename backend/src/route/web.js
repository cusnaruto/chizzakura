const express = require("express");
const router = express.Router();

const {
  createUser,
  findUserByUsername,
} = require("../controller/userController");

router.post("/create-customer", createUser);

router.get("/sample", findUserByUsername);

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

module.exports = {
  router,
};
