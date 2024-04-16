const mongoose = require('mongoose');
const TinhThanhModel = require('../app/models/tinhthanh.model');


async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log('connect Database successfully.')
    } catch (error) {
        console.log('connect DataBase error : '+ error);
    }
}
module.exports = {connect};