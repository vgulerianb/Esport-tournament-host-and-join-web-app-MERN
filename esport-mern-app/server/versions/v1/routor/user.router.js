const { request } = require("express");
const express = require("express");
const router = express.Router();
const { loginUser, signUpUser, verifyUser, changePassword, resetPassword, forgetPassword, invalidateToken } = require("../services/user.service");
const token = require("../../../utils/jwtVerifier")

router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.post("/verify", verifyUser);
router.post("/change-password", token.verifyToken, changePassword);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);
router.post("/logout", token.verifyToken, invalidateToken);

module.exports = router;
