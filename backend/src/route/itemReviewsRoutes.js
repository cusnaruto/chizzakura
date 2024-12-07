const express = require('express');
const router = express.Router();
const { createReview, getReviewsByOrderId } = require('../controllers/itemReviewsController');

router.post('/create-review', createReview);
router.get('/:orderId', getReviewsByOrderId);

module.exports = router;