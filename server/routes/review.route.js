const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.addReview);
router.put('/:id', reviewController.editReview);
router.delete('/:id', reviewController.deleteReview);
router.get('/:restaurantId', reviewController.getReviews);

module.exports = router;