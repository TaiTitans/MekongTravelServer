const mongoose = require('mongoose');
const Schema = mongoose.Schema



// Định nghĩa schema cho dữ liệu chính
const tinhThanhSchema = new Schema({
    tenTinhThanh: {
        type: String,
        required: true,
        index: true,
    },
    maTinh: 
    {
        type: String,
        required: true,
    },
    amThucID: {
        type: Schema.Types.ObjectId,
        ref: 'AmThuc'
    },
    diaDiemID: {
        type: Schema.Types.ObjectId,
        ref: 'DiaDiem'
    }
});


module.exports = mongoose.model('TinhThanh', tinhThanhSchema)