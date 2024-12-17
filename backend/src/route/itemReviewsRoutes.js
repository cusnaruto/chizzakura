const express = require('express');
const router = express.Router();
const { createReview, getReviewsByOrderId, getItemReviews } = require('../controllers/itemReviewsController');

router.post('/create-review', createReview);
router.get('/:orderId', getReviewsByOrderId);
router.get('/item/:itemId', getItemReviews);

module.exports = router;