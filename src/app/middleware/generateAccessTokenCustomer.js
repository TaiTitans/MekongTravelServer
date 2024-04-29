const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model');
// generate access token

function generateAccessTokenCustomer(username){
    const payload = {
        _id: Customer._id,
        username: Customer.username
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
    return accessToken
}



module.exports = generateAccessTokenCustomer