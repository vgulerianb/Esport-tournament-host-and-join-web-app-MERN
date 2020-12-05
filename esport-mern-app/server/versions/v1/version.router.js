const express = require("express");
const router = express.Router();
const userRouter = require("./routor/user.router");

router.get("/", function(req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths
router.use("/login", userRouter);

module.exports = router;
