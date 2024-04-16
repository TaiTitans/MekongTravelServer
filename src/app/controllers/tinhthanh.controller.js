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
            const { maTinh, diaDiemId } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm địa điểm trong mảng diaDiem của tỉnh thành
            const diaDiem = tinhThanh.diaDiem.id(diaDiemId);
    
            if (!diaDiem) {
                return res.status(404).json({ success: false, message: 'Địa điểm không tồn tại' });
            }
    
            // Xóa địa điểm
            tinhThanh.diaDiem.pull(diaDiem);
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Địa điểm đã được xóa thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async chinhSuaDiaDiem(req, res) {
        try {
            const { maTinh, diaDiemId } = req.params;
            const { tenDiaDiem ,moTa, soSao, hinhAnh } = req.body;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm địa điểm trong mảng diaDiem của tỉnh thành
            const diaDiem = tinhThanh.diaDiem.id(diaDiemId);
    
            if (!diaDiem) {
                return res.status(404).json({ success: false, message: 'Địa điểm không tồn tại' });
            }
    
            // Cập nhật thông tin địa điểm
            diaDiem.tenDiaDiem = tenDiaDiem;
            diaDiem.moTa = moTa;
            diaDiem.soSao = soSao;
            diaDiem.hinhAnh = hinhAnh;
    
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Địa điểm đã được cập nhật thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async getAllDiaDiem(req,res){
        try {
            // Lấy danh sách tất cả các tỉnh thành và địa điểm
            const tinhThanhs = await TinhThanhModel.find({}, { diaDiem: 1, _id: 0, maTinh: 1 });
    
            // Tạo một mảng mới chứa các địa điểm kèm theo mã tỉnh
            const diaDiems = tinhThanhs.reduce((acc, tinhThanh) => {
                tinhThanh.diaDiem.forEach(diadiem => {
                    acc.push({ maTinh: tinhThanh.maTinh, tenDiaDiem: diadiem });
                });
                return acc;
            }, []);
    
            res.status(200).json({ success: true, data: diaDiems });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async getDiaDiemByMaTinh(res,req){
        try {
            const { maTinh } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh }, { diaDiem: 1, _id: 0 });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            res.status(200).json({ success: true, data: tinhThanh.diaDiem });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async getDiaDiemById(req,res){
        try {
            const { maTinh, diaDiemId } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm địa điểm trong mảng diaDiem của tỉnh thành
            const diaDiem = tinhThanh.diaDiem.id(diaDiemId);
    
            if (!diaDiem) {
                return res.status(404).json({ success: false, message: 'Địa điểm không tồn tại' });
            }
    
            res.status(200).json({ success: true, data: diaDiem });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    //AmThuc Controller

    async addAmThuc(req,res){
        try{
            const {maTinh} = req.params
            const{tenMonAn, moTa, soTien, hinhAnh} = req.body
            const tinhThanh = await TinhThanhModel.findOne({maTinh, 'amThuc.tenMonAn':tenMonAn})
            if(!tinhThanh){
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
            if (tinhThanh.amThuc.some(item => item.tenMonAn === tenMonAn)) {
                return res.status(400).json({ success: false, message: 'Món ăn đã tồn tại' });
            }
            const newAmThuc = { tenMonAn, moTa, soTien, hinhAnh };
            const updatedTinhThanh = await TinhThanhModel.findOneAndUpdate(
                { maTinh },
                { $push: { amThuc: newAmThuc } },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({ success: true, data: updatedTinhThanh, message: 'Món ăn đã được thêm thành công' });
        }catch(error){
            ErrorHandle(error, res, req);
        }
    }
    async xoaMonAn(req, res) {
        try {
            const { maTinh, amThucId } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm địa điểm trong mảng diaDiem của tỉnh thành
            const amThuc = tinhThanh.amThuc.id(amThucId);
    
            if (!amThuc) {
                return res.status(404).json({ success: false, message: 'Món ăn không tồn tại' });
            }
    
            // Xóa địa điểm
            tinhThanh.amThuc.pull(amThuc);
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Món ăn đã được xóa thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async chinhSuaMonAn(req, res) {
        try {
            const { maTinh, amThucId } = req.params;
            const { tenMonAn,moTa, soTien, hinhAnh } = req.body;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm địa điểm trong mảng diaDiem của tỉnh thành
            const amThuc = tinhThanh.amThuc.id(amThucId);
    
            if (!amThuc) {
                return res.status(404).json({ success: false, message: 'Món ăn không tồn tại' });
            }
    
            // Cập nhật thông tin địa điểm
            amThuc.tenMonAn = tenMonAn
            amThuc.moTa = moTa;
            amThuc.soTien = soTien;
            amThuc.hinhAnh = hinhAnh;
    
            await tinhThanh.save();
    
            res.status(200).json({ success: true, data: tinhThanh, message: 'Món ăn đã được cập nhật thành công' });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async getAllAmThuc(req,res){
        try {
            // Lấy danh sách tất cả các tỉnh thành và địa điểm
            const tinhThanhs = await TinhThanhModel.find({}, { amThuc: 1, _id: 0, maTinh: 1 });
    
            // Tạo một mảng mới chứa các địa điểm kèm theo mã tỉnh
            const amThucs = tinhThanhs.reduce((acc, tinhThanh) => {
                tinhThanh.amThuc.forEach(amThuc => {
                    acc.push({ maTinh: tinhThanh.maTinh, tenMonAn: amThuc });
                });
                return acc;
            }, []);
    
            res.status(200).json({ success: true, data: amThucs });
        } catch (error) {
            ErrorHandle(error, res, req);
        }
    }
    async getAmThucById(req,res){
        try {
            const { maTinh, amThucId } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            // Tìm món ăn trong mảng amThuc của tỉnh thành
            const amThuc = tinhThanh.amThuc.id(amThucId);
    
            if (!amThuc) {
                return res.status(404).json({ success: false, message: 'Món ăn không tồn tại' });
            }
    
            res.status(200).json({ success: true, data: amThuc });
        } catch (error) {
            ErrorHandle(error, res, req);
        }    
    }
    async getAmThucByMaTinh(req,res){
        try {
            const { maTinh } = req.params;
    
            // Tìm tỉnh thành
            const tinhThanh = await TinhThanhModel.findOne({ maTinh }, { amThuc: 1, _id: 0 });
    
            if (!tinhThanh) {
                return res.status(404).json({ success: false, message: 'Tỉnh thành không tồn tại' });
            }
    
            res.status(200).json({ success: true, data: tinhThanh.amThuc });
        } catch (error) {
            ErrorHandle(error, res, req);
        } 
    }
}

module.exports = new TinhThanhController