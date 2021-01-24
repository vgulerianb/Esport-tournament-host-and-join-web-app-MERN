const mongoose = require('../config/connection.mongo');
const Schema = mongoose.Schema;

const GamesSchema = new Schema(
    {
        game_id: {
            type: Number,
            required: true
        },
        game_name: {
            type: String,
            required: true
        },
        game_image: {
            type: String,
            required: true
        },
        game_slug: {
            type: String,
            required: true
        },
        created_by: {
            type: String,
            required: true
        },
        game_description: {
            type: String,
            required: false
        },
        game_type: {
            type: String,
            required: false
        },
        start_time: {
            type: Number,
            required: false
        },
        end_time: {
            type: Number,
            required: false
        },
        joining_description: {
            type: String,
            required: false
        },
        join_code: {
            type: String,
            required: false
        },
        invite_code: {
            type: String,
            required: false
        }
    },
    { versionKey: false }
);

module.exports = Game = mongoose.model('es_games', GamesSchema);
