const tinhThanhRouter = require('./tinhthanh.router')
const diaDiemRouter = require('./diadiem.router')
const amThucRouter = require('./amthuc.router')

const accountRouter = require('./account.router')
const {json} = require('express');
function route(app){
    app.use('/api/tinhthanh', tinhThanhRouter),
    app.use('/api/account', accountRouter),
    app.use('/api/diadiem', diaDiemRouter),
    app.use('/api/amthuc', amThucRouter)
}

module.exports = route