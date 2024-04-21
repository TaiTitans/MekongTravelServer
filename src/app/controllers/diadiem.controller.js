const DiaDiem = require('../models/diadiem.model')
class DiaDiemController {
    async create(req, res) {
        try {
            const {
                tenDiaDiem,
                moTa,
                soSao,
                hinhAnh,
                tinhThanhID
            } = req.body;
            const diaDiemInfo = {
                tenDiaDiem: tenDiaDiem,
                moTa: moTa,
                soSao: soSao,
                hinhAnh: hinhAnh,
                tinhThanhID: tinhThanhID
            }
            const diaDiems = new DiaDiem(diaDiemInfo)
            await diaDiems.save()
            res.status(200).json({
                data: diaDiems,
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
                _id,
                tenDiaDiem,
                moTa,
                soSao,
                hinhAnh,
                tinhThanhID
            } = req.body;
            const diaDiemUpdate = await DiaDiem.findOne({
                _id
            });


            if (!diaDiemUpdate) {
                return res.status(404).json({
                    data: null,
                    error: error
                });
            }


            diaDiemUpdate.tenDiaDiem = tenDiaDiem;
            diaDiemUpdate.moTa = moTa;
            diaDiemUpdate.soSao = soSao;
            diaDiemUpdate.hinhAnh = hinhAnh;
            diaDiemUpdate.tinhThanhID = tinhThanhID;

            await diaDiemUpdate.save();
            return res.status(200).json({
                data: diaDiemUpdate,
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
            const diaDiemDelete = await DiaDiem.findOne({
                _id
            });
            if (!diaDiemDelete) {
                return res.status(404).json({
                    data: null,
                    error: error
                });
            } else {
                await diaDiemDelete.deleteOne()
                res.status(200).json({
                    data: diaDiemDelete,
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
            } = req.params
            const diaDiemFind = await DiaDiem.findOne({
                _id
            })

            if (!diaDiemFind) {
                res.status(404).json({
                    data: null,
                    error: error
                });
            }
            res.status(200).json({
                data: diaDiemFind,
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
            const diaDiemFindAll = await DiaDiem.find({})
            if (!diaDiemFindAll) {
                res.status(404).json({
                    data: null,
                    error: error
                })
            }
            res.status(200).json({
                data: diaDiemFindAll,
                error: null
            })
        } catch (error) {
            res.status(404).json({
                data: null,
                error: error
            })


        }
    }
    async getDiaDiemTheoTinhThanh(req, res) {
        try {
            const { tinhThanhID } = req.params;
            const diaDiemList = await DiaDiem.find({ tinhThanhID }).populate('tinhThanhID').exec();
    
            if (diaDiemList.length === 0) {
                return res.status(404).json({ data: null, error: 'Không tìm thấy địa điểm' });
            }
    
            const data = diaDiemList.map(({ _id, tenDiaDiem, moTa, soSao, hinhAnh, tinhThanhID }) => ({
                _id,
                tenDiaDiem,
                moTa,
                soSao,
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
}
module.exports = new DiaDiemController