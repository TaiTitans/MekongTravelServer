const mongoose = require('mongoose');
const Schema = mongoose.Schema

const messageHistorySchema = new Schema({
    CustomerMH: { type: Schema.Types.ObjectId, ref: 'Customer' },
    IntentMH: { type: Schema.Types.ObjectId, ref: 'Intent' },
    userId: {
        type: String,
        ref: 'Customer'
    },
    message: String,
    intent: {
        type: String,
        ref: 'Intent'
    },
    response: String,
},{
    timestamps:true
});

module.exports = mongoose.model('MessageHistory', messageHistorySchema)
