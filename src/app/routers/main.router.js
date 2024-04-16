const tinhThanhRouter = require('./tinhthanh.router')
function route(app){
    app.use('/api/tinhthanh', tinhThanhRouter)
}

module.exports = route