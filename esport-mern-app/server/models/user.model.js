const mongoose = require('../config/connection.mongo');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        uid: {
            type: Number,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
    },
    { versionKey: false }
);

module.exports = Company = mongoose.model('es_users', UsersSchema);
