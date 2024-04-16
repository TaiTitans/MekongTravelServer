const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const StaffSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        require:true,
    }
})

StaffSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error){
        throw new Error(error)
    }
}

module.exports = mongoose.model('Staff', StaffSchema);