const express = require("express");
const router = express.Router();
const userRouter = require("./routor/user.router");
const gameRouter = require("./routor/game.router");

router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths
router.use("/user", userRouter);
router.use("/game", gameRouter);

module.exports = router;
