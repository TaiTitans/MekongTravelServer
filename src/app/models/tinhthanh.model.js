const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Định nghĩa schema cho món ăn
const monAnSchema = new Schema({
    tenMonAn: String,
    moTa: String,
    soTien: Number,
    hinhAnh: String
});

// Định nghĩa schema cho địa điểm
const diaDiemSchema = new Schema({
    tenDiaDiem: String,
    moTa: String,
    soSao: Number,
    hinhAnh: String
});

// Định nghĩa schema cho dữ liệu chính
const tinhThanhSchema = new Schema({
    tenTinhThanh: String,
    maTinh: String,
    amThuc: [monAnSchema],
    diaDiem: [diaDiemSchema]
});

tinhThanhSchema.pre('findOne', function(next) {
    if (!Array.isArray(this._conditions.diaDiem)) {
        this._conditions.diaDiem = { $exists: true };
    }
    next();
});

tinhThanhSchema.pre('save', function(next) {
    if (!Array.isArray(this.diaDiem)) {
        this.diaDiem = [this.diaDiem];
    }
    next();
});

module.exports = mongoose.model('TinhThanh', tinhThanhSchema)