const jwt = require('jsonwebtoken');
const Staff = require('../models/account.model');
// generate access token

function generateAccessToken(username){
    const payload = {
        _id: Staff._id,
        username: Staff.username
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
    return accessToken
}



module.exports = generateAccessToken