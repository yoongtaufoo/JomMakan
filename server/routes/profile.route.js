const express = require("express");
const upload = require("../middleware/profile");

const {
  getProfile,
  updateProfile,
  updateProfilePic,
} = require("../controllers/profile.controller.js");
const { uploader } = require("../utils/cloudinary.js");

const router = express.Router();

router.put("/:userId", updateProfile);
router.get("/:userId", getProfile);
// router.post("/profile-pic/:userId", upload.single("my_file"), updateProfilePic);
router.put("/profile-pic/:userId", updateProfilePic);

module.exports = router;
