const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const { use } = require('../versions/v1/routor/user.router');

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, "VG", async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                const validate = await validateIssuer(decoded['jid'], decoded['username']);
                if (validate) {
                    req.token = decoded;
                    next();
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'Invalid token.'
                    });
                }
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};

const verifyAdminToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, "VG", async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                if (decoded['role'] && decoded['role'] === 'admin') {
                    const validate = await validateIssuer(decoded['jid'], decoded['username']);
                    if (validate) {
                        req.token = decoded;
                        next();
                    } else {
                        return res.status(403).json({
                            success: false,
                            message: 'Invalid token.'
                        });
                    }
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'Access Denied'
                    });
                }

            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};

const verifyVendorToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, "VG", async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                if (decoded['role'] && (decoded['role'] === 'vendor' || decoded['role'] === 'admin')) {
                    const validate = await validateIssuer(decoded['jid'], decoded['username']);
                    if (validate) {
                        req.token = decoded;
                        next();
                    } else {
                        return res.status(403).json({
                            success: false,
                            message: 'Invalid token.'
                        });
                    }
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'Access Denied'
                    });
                }
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};
//This function validate if the jwt token is issued by us or not,
//this additional step is to prevent user account from getting hacked in case jwt token is leaked.
const validateIssuer = async (jid, username) => {
    if (jid) {
        const userCount = await UserModel.countDocuments({ 'jid': jid, 'username': username });
        return userCount;
    }
    return false;
}

module.exports = {
    verifyToken,
    verifyVendorToken,
    verifyAdminToken
};