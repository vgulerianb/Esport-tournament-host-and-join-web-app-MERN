const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getGames, createGame } = require("../services/game.service");
const token = require("../../../utils/jwtVerifier")

router.get("/", getGames);
router.post("/", token.verifyToken, createGame);

module.exports = router;
