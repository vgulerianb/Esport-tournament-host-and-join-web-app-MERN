const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getGames, createGame, EditGame, joinGame } = require("../services/game.service");
const token = require("../../../utils/jwtVerifier")

router.get("/", getGames);
router.get("/join", joinGame);
router.post("/", token.verifyToken, createGame);
router.put("/", token.verifyToken, EditGame);

module.exports = router;
