const { request } = require("express");
const express = require("express");
const router = express.Router();
const { loginUser, signUpUser, verifyUser, changePassword, resetPassword, forgetPassword, invalidateToken, createTFA, verifyTFA, tfaLoginUser } = require("../services/user.service");
const token = require("../../../utils/jwtVerifier")

router.post("/login", loginUser);
router.post("/tfa-login", tfaLoginUser);
router.post("/signup", signUpUser);
router.post("/verify", verifyUser);
router.put("/tfa", token.verifyToken, createTFA);
router.put("/verify-tfa", token.verifyToken, verifyTFA);
router.post("/change-password", token.verifyToken, changePassword);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);
router.post("/logout", token.verifyToken, invalidateToken);

module.exports = router;
