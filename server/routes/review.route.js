const express = require("express");
const router = express.Router();
const {
  review,
  getReview,
  likeReview,
  deleteReview,
} = require("../controllers/review.controller");

router.post("/:_id/addReview", review);
router.get("/:_id/reviews", getReview);
router.post("/:_id/likeReview", likeReview);
router.delete("/:id/deleteReview", deleteReview);

module.exports = router;
