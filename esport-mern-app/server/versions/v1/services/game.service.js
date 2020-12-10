const GameModal = require("../../../models/game.model");
const jwt_decode = require("jwt-decode");

const getGames = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    const games = await GameModal.find({}, { join_code: 0, joining_description: 0 }).sort({ _id: -1 }).limit(10);
    return res.json({ status: false, message: "Success", data: games })
};

module.exports = { getGames };
