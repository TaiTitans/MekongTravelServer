const AmThuc = require('../models/amthuc.model')
class AmThucController {
    async create(req, res) {
        try {
            const {
                tenMonAn,
                moTa,
                soTien,
                hinhAnh,
                tinhThanhID
            } = req.body;
            const amThucInfo = {
                tenMonAn: tenMonAn,
                moTa: moTa,
                soTien: soTien,
                hinhAnh: hinhAnh,
                tinhThanhID: tinhThanhID
            }
            const amThucs = new AmThuc(amThucInfo)
            await amThucs.save()
            res.status(200).json({
                data: amThucs,
                error: null
            })
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })
        }
    }
    async update(req, res) {
        try {
            const {
                tenMonAn,
                moTa,
                soTien,
                hinhAnh,
                tinhThanhID
            } = req.body;

            const amThucUpdate = await AmThuc.findOne({
                _id
            });


            if (!amThucUpdate) {
                return res.status(404).json({
                    data: null,
                    error: error
                });
            }


            amThucUpdate.tenMonAn = tenMonAn;
            amThucUpdate.moTa = moTa;
            amThucUpdate.soTien = soTien;
            amThucUpdate.hinhAnh = hinhAnh;
            amThucUpdate.tinhThanhID = tinhThanhID;

            await amThucUpdate.save();
            return res.status(200).json({
                data: amThucUpdate,
                error: null
            });
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })

        }
    }

    async delete(req, res) {
        try {
            const {
                _id
            } = req.params
            const amThucDelete = await AmThuc.findOne({
                _id
            });
            if (!amThucDelete) {
                return res.status(404).json({
                    data: null,
                    error: error
                });
            } else {
                await amThucDelete.deleteOne()
                res.status(200).json({
                    data: amThucDelete,
                    error: null
                })
            }


        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })



        }
    }
    async get(req, res) {
        try {
            const {
                _id
            } = req.params._id
            const amThucFind = await AmThuc.findOne({
                _id
            })

            if (!amThucFind) {
                res.status(404).json({
                    data: null,
                    error: error
                });
            }
            res.status(200).json({
                data: amThucFind,
                error: null
            });
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })


        }
    }
    async getAll(req, res) {
        try {
            const amThucFindAll = await AmThuc.find({})
            if (!amThucFindAll) {
                res.status(404).json({
                    data: null,
                    error: error
                })
            }
            res.status(200).json({
                data: amThucFindAll,
                error: null
            })
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })

        }
    }
    async getAmThucTheoTinhThanh(req, res) {
        try {
            const { tinhThanhID } = req.params;
            const amThucList = await AmThuc.find({ tinhThanhID }).populate('tinhThanhID').exec();
    
            if (amThucList.length === 0) {
                return res.status(404).json({ data: null, error: 'Không tìm thấy ẩm thực' });
            }
    
            const data = amThucList.map(({ _id, tenMonAn, moTa, soTien, hinhAnh, tinhThanhID }) => ({
                _id,
                tenMonAn,
                moTa,
                soTien,
                hinhAnh,
                tinhThanhID,
            }));
    
            res.status(200).json({ data, error: null });
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })
        }
    }
    async searchAmThuc(req, res) {
        const { searchKeyword } = req.body;
        
        // Xử lý từ khóa trước khi tìm kiếm
        const cleanKeyword = searchKeyword.trim().replace(/[^\w\s]/gi, ''); // Loại bỏ các ký tự đặc biệt
        
        try {
          const amThucList = await AmThuc.find({
            $or: [
              { tenMonAn: { $regex: new RegExp(cleanKeyword, 'i') } }, // Tìm theo tên món ăn có chứa từ khóa (không phân biệt hoa thường)
              { moTa: { $regex: new RegExp(cleanKeyword, 'i') } } // Tìm theo mô tả có chứa từ khóa (không phân biệt hoa thường)
            ]
          }).populate('tinhThanhID');
          
          res.status(200).json({ success: true, data: amThucList });
        } catch (error) {
          console.error('Error searching amThuc:', error);
          res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tìm kiếm ẩm thực.' });
        }
      }
      
}
module.exports = new AmThucController