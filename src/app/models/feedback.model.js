const mongoose = require('mongoose');
const Schema = mongoose.Schema

const feedBackSchema = new Schema({
    name: String,
    email: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Feedback', feedBackSchema)
