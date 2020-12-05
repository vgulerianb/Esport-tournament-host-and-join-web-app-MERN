const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
const jwtSecret = "VG"
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const encrypt = (text)=>{
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
const decrypt = (text) => {
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  
  const generateToken = (data) => {
    //JID - Unique id for jwt token
    data['jid'] = data['uid'] + "_"+Math.round(Math.random()*10000)+"_"+ new Date().getTime();
    let token = jwt.sign(data,jwtSecret,{expiresIn:30000});
    return {token:token, 'jid' : data['jid']};
  }

module.exports = { decrypt,encrypt,generateToken };
