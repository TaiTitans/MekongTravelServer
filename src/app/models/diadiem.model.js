const mongoose = require('mongoose');
const Schema = mongoose.Schema

const diaDiemSchema = new Schema({
    tenDiaDiem: String,
    moTa: String,
    soSao: Number,
    hinhAnh: String,
    tinhThanhID: {
        type: Schema.Types.ObjectId,
        ref: 'TinhThanh',
        required: true
    }
});

module.exports = mongoose.model('DiaDiem', diaDiemSchema)
