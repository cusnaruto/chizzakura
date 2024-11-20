const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Route chỉ cho phép admin truy cập
router.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});

// Route dành cho người dùng đã đăng nhập bình thường
router.get('/user', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.role}` });
});

module.exports = router;
