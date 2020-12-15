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
        jid: {
            type: Object,
            required: false
        },
        verificationStatus: {
            type: Number,
            required: false
        },
        v_code: {
            type: String,
            required: false
        },
        r_code: {
            type: String,
            required: false
        },
        r_valid: {
            type: Number,
            required: false
        },
        userrole: {
            type: String,
            required: false
        },
    },
    { versionKey: false }
);

module.exports = Company = mongoose.model('es_users', UsersSchema);
