const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
const jwtSecret = "VG"
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const encrypt = (text)=>{
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
const decrypt = (text) => {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  
  const generateToken = (data) => {
    var token = jwt.sign(data,jwtSecret,{expiresIn:30});
    return token;
  }

module.exports = { decrypt,encrypt,generateToken };
