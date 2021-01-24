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
    if (request && req['token']['uid'] && request['game_name'] && request['start_time'] && request['game_description']) {
        let game_id = await GameModal.findOne({}, { game_id: 1 }).sort({ _id: -1 }).limit(1)
        let temp = {};
        temp['game_id'] = game_id ? game_id['game_id'] + 1 : 1;
        if (request['game_type']) {
            temp['invite_code'] = Math.random().toString(36).substring(2);
            request['game_type'] = "private"
        } else
            request['game_type'] = "public"
        temp['game_slug'] = slugify(request['game_name'] + '-' + temp['game_id']);
        temp['created_by'] = req['token']['uid'];
        const user = await GameModal.create({ ...request, ...temp });
        return res.json({ status: true, message: "Game created successfully", data: temp })
    }
    return res.json({ status: false, message: "Something went wrong" })
};

const EditGame = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && req['token']['uid'] && request['game_id']) {
        let game_id = await GameModal.findOneAndUpdate({ game_id: request['game_id'], created_by: req['token']['uid'] }, request)
        if (game_id)
            return res.json({ status: true, message: "Game updated successfully" })
        else
            return res.json({ status: false, message: "Something went wrong, provided game id maybe invalid or you donot have access to edit this game" })

    }
    return res.json({ status: false, message: "Required parameters missing" })
};


module.exports = { getGames, createGame, EditGame };
