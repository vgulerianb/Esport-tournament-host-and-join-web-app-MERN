const UserModel = require("../../../models/user.model");
const {decrypt,generateToken} = require("../../../utils/common.util")
const getName = async (req, res) => {
    if (true) {
        let temp = {};
        temp['username'] = "admin";
        temp['pass'] = "test"
        const user = await UserModel.findOne({'username':temp['username']});
        if(user && temp['pass']===decrypt(user['password'])){
            let user_token = generateToken({'username':user['username'],'uid':user['uid']});
            return res.json({ status: 1, message: "Success", data: {user_token:user_token} });
        }
        return res.json({ status: 2, message: "Wrong Password" });
    } else {
        return res.json({ status: 0, message: "Fail" });
    }
};
module.exports = { getName };
