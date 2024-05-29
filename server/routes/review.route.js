const express = require("express");
const router = express.Router();
const {
  review,
  getReview,
  likeReview,
  deleteReview,
  updateReview,
  shareReview,
} = require("../controllers/review.controller");

router.post("/:_id/addReview", review);
router.get("/:_id/reviews", getReview);
router.post("/:_id/likeReview", likeReview);
router.delete("/:_id/deleteReview", deleteReview);
router.put("/:_id/editReview", updateReview);
router.post("/:_id/shareReview", shareReview);

module.exports = router;
