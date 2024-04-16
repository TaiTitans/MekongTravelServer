const TinhThanhModel = require('../models/tinhthanh.model')

const ErrorHandle = require('../middleware/error.middleware')


class TinhThanhController{
    async getAll(req,res){
        try{
            const tinhThanhFindAll = await TinhThanhModel.find({})
            if(!tinhThanhFindAll){
                res.status(404).json({data:null, error:"Tinh Thanh Not Found"})
            }
            res.status(200).json({success:tinhThanhFindAll, error:null})
        }catch(error){
            ErrorHandle(error, res,req)
        }
    }
    async getOne(req, res) {
        try {
            const { _id } = req.params;
            const tinhThanhFind = await TinhThanhModel.findOne({ _id });
    
            if (!tinhThanhFind) {
                return res.status(404).json({ data: null, error: "Data Not Found" });
            }
    
            res.status(200).json({ success: tinhThanhFind, error: null });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async addDiaDiem(req, res) {
        try {
            const { maTinh } = req.params;
            const { tenDiaDiem, moTa, soSao, hinhAnh } = req.body;
    
            const tinhThanh = await TinhThanhModel.findOne({ maTinh, 'diaDiem.tenDiaDiem': tenDiaDiem });

            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
            
            if (tinhThanh.diaDiem.some(item => item.tenDiaDiem === tenDiaDiem)) {
                return res.status(400).json({ success: false, message: 'Địa điểm đã tồn tại' });
            }
            
            // Tiếp tục thực hiện thêm địa điểm
            const newDiaDiem = { tenDiaDiem, moTa, soSao, hinhAnh };
            const updatedTinhThanh = await TinhThanhModel.findOneAndUpdate(
                { maTinh },
                { $push: { diaDiem: newDiaDiem } },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({ success: true, data: updatedTinhThanh, message: 'Địa điểm đã được thêm thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async xoaDiaDiem(req, res) {
        try {
            const { maTinh, tenDiaDiem } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm vị trí của địa điểm trong mảng diaDiem
            const diaDiemIndex = tinhThanh.diaDiem.findIndex(item => item.tenDiaDiem === tenDiaDiem);
    
            if (diaDiemIndex === -1) {
                return res.status(404).json({ success: false, message: 'Địa điểm không tồn tại' });
            }
    
            // Xóa địa điểm
            tinhThanh.diaDiem.splice(diaDiemIndex, 1);
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Địa điểm đã được xóa thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async chinhSuaDiaDiem(req, res) {
        try {
            const { maTinh, tenDiaDiem } = req.params;
            const { moTa, soSao, hinhAnh } = req.body;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh, 'diaDiem.tenDiaDiem': tenDiaDiem });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành hoặc địa điểm không tồn tại' });
            }
    
            // Tìm vị trí của địa điểm trong mảng diaDiem
            const diaDiemIndex = tinhThanh.diaDiem.findIndex(item => item.tenDiaDiem === tenDiaDiem);
    
            // Cập nhật thông tin địa điểm
            tinhThanh.diaDiem[diaDiemIndex].moTa = moTa;
            tinhThanh.diaDiem[diaDiemIndex].soSao = soSao;
            tinhThanh.diaDiem[diaDiemIndex].hinhAnh = hinhAnh;
    
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Địa điểm đã được cập nhật thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    
    
    
    
}

module.exports = new TinhThanhController