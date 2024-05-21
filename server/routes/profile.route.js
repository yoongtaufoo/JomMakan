const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller.js");

const router = express.Router();

router.put("/:userId", updateProfile);
router.get("/:userId", getProfile);

module.exports = router;
