const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "mediaUpload/" });


const {
  review,
  getReview,
  likeReview,
  deleteReview,
  updateReview,
  shareReview,
  edit,
} = require("../controllers/review.controller");

router.post("/:_id/addReview",upload.single('image'), review);
router.get("/:_id/reviews", getReview);
router.post("/:_id/likeReview", likeReview);
router.delete("/:_id/deleteReview", deleteReview);
router.put("/:_id/editReview", upload.single("image"), updateReview);
router.post("/:_id/shareReview", shareReview);
router.get("/:reviewId", edit);

module.exports = router;
