const express = require('express');
const router = express.Router();
const {review, myreview, editReview, deleteReview, getReview } = require('../controllers/review.controller');

router.post('/:_id/addReview', review);
router.get('/review/:reviewId/edit', editReview);
router.get('/review/:reviewId/delete', deleteReview);
router.get('/restaurant/:_id/reviews', myreview);


module.exports = router;