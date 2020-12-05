const express = require("express");
const router = express.Router();
const { getName } = require("../services/user.service");

router.get("/", getName);

module.exports = router;
