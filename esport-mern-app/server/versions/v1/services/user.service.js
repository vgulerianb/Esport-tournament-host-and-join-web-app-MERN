const UserModel = require("../../../models/user.model");
const { decrypt, generateToken, encrypt, send_mail } = require("../../../utils/common.util")
const jwt_decode = require("jwt-decode");

const loginUser = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['username'] && request['password']) {
        const user = await UserModel.findOne({ 'username': request['username'] });
        if (user && request['password'] === decrypt(user['password'])) {
            if (user['verificationStatus'] === 1) {
                let existingSessions = user['jid'] ? user['jid'] : [];
                let user_token = generateToken({ 'username': user['username'], 'uid': user['uid'], 'role': user['userrole'] });
                existingSessions.push(user_token['jid'])
                await UserModel.findOneAndUpdate({ 'username': request['username'] }, { jid: existingSessions });
                return res.json({ status: true, message: "Success", data: { user_token: user_token['token'] } });
            }
            return res.json({ status: false, message: "Please verify your email address" });
        }
        return res.json({ status: false, message: "Wrong Password" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

const signUpUser = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    let request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['username'] && request['first_name'] && request['password']) {
        const userCount = await UserModel.countDocuments({ 'username': request['username'] });
        if (userCount === 0) {
            let uid = await UserModel.findOne({}, { uid: 1 }).sort({ _id: -1 }).limit(1)
            if (uid['uid'] && !isNaN(uid['uid'])) {
                request['uid'] = uid['uid'] + 1;
                request['userrole'] = request['mode'] && request['mode'] === 1 ? 'vendor' : 'user';
                request['uid'] = uid['uid'] + 1;
                request['password'] = encrypt(request['password']);
                request['verification_status'] = 0;
                request['v_code'] = "vcode_" + request['uid'] + "_" + Math.round(Math.random() * 100000) + "_" + new Date().getTime();
                send_mail(request['username'], "Account Verification Required", "Account Verification", "This is description to Account Verification desc", "http://localhost:5000/verify-account/?vcode=" + request['v_code'], "Verify Account");
                const user = await UserModel.create(request);
                return res.json({ status: true, message: "User added successfully" });
            } else
                return res.json({ status: false, message: "Something went wrong" });
        }
        return res.json({ status: false, message: "User Already Exist" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

const verifyUser = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['v_code']) {
        const user = await UserModel.findOneAndUpdate({ 'v_code': request['v_code'] }, { verificationStatus: 1 });
        if (user)
            return res.json({ status: true, message: "Verification Successfull" });
        return res.json({ status: false, message: "Something went wrong" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

const forgetPassword = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['username']) {
        let reset_code = request['username'] + "_" + Math.random().toString(36).substring(2) + Math.round(Math.random() * 100000) + "_" + new Date().getTime();
        let validity = Math.round((new Date().getTime() / 1000) + 3600);
        const user = await UserModel.findOneAndUpdate({ 'username': request['username'] }, { r_code: reset_code, r_valid: validity });
        if (user) {
            send_mail(request['username'], "Reset Password", "Reset Password", "This is description to reset password", "http://localhost:5000/reset-password/?r_code=" + reset_code, "Reset Password");
            return res.json({ status: true, message: "Reset code sent successfull" });
        }
        return res.json({ status: false, message: "Something went wrong" });

    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

const resetPassword = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['r_code'] && request['password']) {
        const user = await UserModel.findOneAndUpdate({ 'r_code': request['r_code'], r_valid: { $gt: Math.round(new Date() / 1000) } }, { password: encrypt(request['password']), r_code: "", r_valid: 0 });
        if (user)
            return res.json({ status: true, message: "Password changed successfull" });
        return res.json({ status: false, message: "Reset code is expired" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

const changePassword = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const request = { ...params, ...queryParams, ...bodyParams };
    if (request && request['old_pass'], request['new_pass'] && req.token) {
        let decodedToken = req.token;
        const user = await UserModel.findOneAndUpdate({ 'username': decodedToken['username'], 'password': encrypt(request['old_pass']) }, { 'password': encrypt(request['new_pass']) });
        if (user)
            return res.json({ status: true, message: "Password changed successfull" });
        return res.json({ status: false, message: "Invalid old password" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

//Function to invalidate jwt token after logout
const invalidateToken = async (req, res) => {
    if (req.token) {
        const user = await UserModel.findOne({ 'jid': req.token['jid'] }, { 'jid': 1 });
        if (user && user.jid) {
            const index = user.jid.indexOf(req.token['jid']);
            let activeSessions = user.jid;
            if (index > -1) {
                activeSessions.splice(index, 1);
            }
            await UserModel.findOneAndUpdate({ 'jid': req.token['jid'] }, { 'jid': activeSessions });
            return res.json({ status: true, message: "Logged out successfully" });
        }
        return res.json({ status: false, message: "Unable to invalidate session" });
    } else {
        return res.json({ status: false, message: "Parameters Missing" });
    }
};

module.exports = { loginUser, signUpUser, verifyUser, changePassword, resetPassword, forgetPassword, invalidateToken };
