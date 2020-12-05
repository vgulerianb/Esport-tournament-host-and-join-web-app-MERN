const express = require("express");
const router = express.Router();
const { loginUser,signUpUser,verifyUser,changePassword,resetPassword,forgetPassword} = require("../services/user.service");

router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.post("/verify", verifyUser);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);

module.exports = router;
