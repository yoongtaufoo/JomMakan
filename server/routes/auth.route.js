const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  updatePassword,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password/:id/:token", forgotPassword);
// router.post("/reset-password/:id/:token", resetPassword);
router.put("/reset-password", updatePassword);

module.exports = router;
