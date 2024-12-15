const ItemReview = require('../model/Itemreviews');
const Items = require('../model/Items');
const Order = require('../model/order');
const OrderDetail = require('../model/orderdetail');
const User = require('../model/user'); // Add User model import

const createReview = async (req, res) => {
  try {
    const { orderId, itemId, userId, rating, comment } = req.body;
    const review = await ItemReview.create({
      orderId,
      itemId,
      userId,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: error.message });
  }
};

const getReviewsByOrderId = async (req, res) => {
  try {
      const { orderId } = req.params;
  
      // First get all items from the order through OrderDetails
      const orderItems = await OrderDetail.findAll({
          where: { orderId },
          include: [{
              model: Items,
              as: 'Item', // Add the alias here
              attributes: ['id', 'name', 'price', 'image']
          }]
      });
  
      // Then get any existing reviews for these items
      const reviews = await ItemReview.findAll({
          where: { orderId },
          include: [{
              model: Items,
              as: 'Item', // Add the alias here
              attributes: ['id', 'name', 'price', 'image']
          }]
      });
  
      // Combine the data to include all items, with reviews if they exist
      const result = orderItems.map(orderItem => {
          const existingReview = reviews.find(review => review.itemId === orderItem.Item.id);
          return {
              id: existingReview?.id || null,
              orderId: parseInt(orderId),
              itemId: orderItem.Item.id,
              rating: existingReview?.rating || null,
              comment: existingReview?.comment || null,
              Item: orderItem.Item
          };
      });
  
      if (orderItems.length > 0) {
          res.status(200).json(result);
      } else {
          res.status(404).json({ error: "No items found for this order" });
      }
  } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: error.message });
  }
};

const getItemReviews = async (req, res) => {
  try {
      const { itemId } = req.params;
      
      const reviews = await ItemReview.findAll({
          where: { itemId },
          include: [{
              model: User,
              as: 'User',
              attributes: [
                  'id', 
                  'first_name',
                  'last_name'
              ]
          }],
          order: [['createdAt', 'DESC']] // Sort by creation time
      });

      const ratings = reviews.map(review => parseFloat(review.rating));
      const averageRating = ratings.length > 0 
          ? ratings.reduce((a, b) => a + b) / ratings.length 
          : 0;

      const formattedReviews = reviews.map(review => ({
          ...review.toJSON(),
          User: {
              ...review.User.toJSON(),
              name: `${review.User.first_name} ${review.User.last_name}`
          },
          createdAt: new Date(review.createdAt).toLocaleString() // Format the date
      }));

      res.status(200).json({
          reviews: formattedReviews,
          averageRating,
          totalReviews: reviews.length
      });
  } catch (error) {
      console.error("Error fetching item reviews:", error);
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByOrderId,
  getItemReviews
};