const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getGames, createGame, EditGame, joinGame, userGames } = require("../services/game.service");
const token = require("../../../utils/jwtVerifier")

router.get("/", getGames);
router.post("/join", token.verifyToken, joinGame);
router.post("/activity", token.verifyToken, userGames);
router.post("/", token.verifyToken, createGame);
router.put("/", token.verifyToken, EditGame);

module.exports = router;
