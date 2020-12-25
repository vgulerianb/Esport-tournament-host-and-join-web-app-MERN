const GameModal = require("../../../models/game.model");
const slugify = require("slugify");

const getGames = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    const games = await GameModal.find({}, { join_code: 0, joining_description: 0 }).sort({ _id: -1 }).limit(10);
    if (games) {
        return res.json({ status: true, message: "Success", data: games })
    } else
        return res.json({ status: false, message: "Unable to fetch games", data: [] })
};

const createGame = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && req['token']['uid'] && request['game_name'] && request['game_type'] && request['start_time'] && request['game_description']) {
        let game_id = await GameModal.findOne({}, { game_id: 1 }).sort({ _id: -1 }).limit(1)
        let temp = {};
        console.log(req['token'])
        temp['game_id'] = game_id ? game_id['game_id'] + 1 : 1;
        temp['invite_code'] = Math.random().toString(36).substring(2);
        temp['game_slug'] = slugify(request['game_name'] + '-' + temp['game_id']);
        temp['created_by'] = req['token']['uid'];
        const user = await GameModal.create({ ...request, ...temp });
        return res.json({ status: true, message: "Game created successfully", data: temp })
    }
    return res.json({ status: false, message: "Something went wrong" })
};


module.exports = { getGames, createGame };
