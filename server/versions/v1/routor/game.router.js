const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getGames, createGame, EditGame } = require("../services/game.service");
const token = require("../../../utils/jwtVerifier")

router.get("/", getGames);
router.post("/", token.verifyVendorToken, createGame);
router.put("/", token.verifyVendorToken, EditGame);

module.exports = router;
