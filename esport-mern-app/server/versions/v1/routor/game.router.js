const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getGames } = require("../services/game.service");

router.get("/", getGames);

module.exports = router;
