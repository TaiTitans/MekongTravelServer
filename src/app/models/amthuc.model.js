const mongoose = require('mongoose');
const Schema = mongoose.Schema

const amThucSchema = new Schema({
    tenMonAn: String,
    moTa: String,
    soTien: Number,
    hinhAnh: String,
    tinhThanhID: {
        type: Schema.Types.ObjectId,
        ref: 'TinhThanh', 
        required: true 
    }
});

module.exports = mongoose.model('AmThuc', amThucSchema)
