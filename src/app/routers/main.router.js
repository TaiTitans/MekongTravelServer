const tinhThanhRouter = require('./tinhthanh.router')
const diaDiemRouter = require('./diadiem.router')
const amThucRouter = require('./amthuc.router')
const feedBackRouter = require('./feedback.router')
const accountRouter = require('./account.router')
const messageRouter = require('./message.router')
const intentRouter = require('./intent.router')
const customerRouter = require('./customer.router')
const {json} = require('express');
function route(app){
    app.use('/api/tinhthanh', tinhThanhRouter),
    app.use('/api/account', accountRouter),
    app.use('/api/diadiem', diaDiemRouter),
    app.use('/api/amthuc', amThucRouter)
    app.use('/api/feedback', feedBackRouter)
    app.use('/api', messageRouter)
    app.use('/api', intentRouter)
    app.use('/api/customer', customerRouter)
}

module.exports = route