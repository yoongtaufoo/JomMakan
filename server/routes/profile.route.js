const express = require("express");

const {
  getProfile,
  updateProfile,
  updateProfilePic,
} = require("../controllers/profile.controller.js");

const router = express.Router();

router.put("/:userId", updateProfile);
router.get("/:userId", getProfile);
router.put("/profile-pic/:userId", updateProfilePic);

module.exports = router;
