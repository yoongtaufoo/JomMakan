const express = require("express");
const router = express.Router();
const {
  review,
  editReview,
  deleteReview,
  getReview,
} = require("../controllers/review.controller");

router.post("/:_id/addReview", review);
router.put("/:reviewId/edit", editReview);
router.get("/:reviewId/delete", deleteReview);
router.get("/:_id/reviews", getReview);

module.exports = router;
