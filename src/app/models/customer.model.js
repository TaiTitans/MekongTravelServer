const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const CustomerSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    email: String,
    password:{
        type:String,
        require:true,
    }
})

CustomerSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error){
        throw new Error(error)
    }
}

module.exports = mongoose.model('Customer', CustomerSchema);