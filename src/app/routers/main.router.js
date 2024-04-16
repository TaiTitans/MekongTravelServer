const tinhThanhRouter = require('./tinhthanh.router')
const accountRouter = require('./account.router')
const {json} = require('express');
function route(app){
    app.use('/api/tinhthanh', tinhThanhRouter),
    app.use('/api/account', accountRouter)
}

module.exports = route