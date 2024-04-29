const mongoose = require('mongoose');
const Schema = mongoose.Schema

const intentSchema = new Schema({
   name: String,
   examples: String,
   reponses: String
});

module.exports = mongoose.model('Intent', intentSchema)
