const TinhThanh = require('../models/tinhthanh.model')

const ErrorHandle = require('../middleware/error.middleware')


class TinhThanhController{
  async add(req,res){
    try{
        const {tenTinhThanh, maTinh} = req.body;
        const existingTinhThanh = await TinhThanh.findOne({tenTinhThanh});
        if(existingTinhThanh){
            return res.status(400).json({error:error})
        }
        const newTinhThanh = new TinhThanh({
            tenTinhThanh,
            maTinh
        })
        await newTinhThanh.save()
        res.status(201).json(newTinhThanh)
    } catch(error){
        res.status(400).json({ data: null, error: error });
    }
  }
  async delete(req,res){
    try{
        const {_id} = req.params;
        const existingTinhThanh = await TinhThanh.findOne({_id});
        if(existingTinhThanh){
            return res.status(400).json({error:error})
        }
        await existingTinhThanh.deleteOne()
        res.status(201).json(existingTinhThanh)
    }catch(error){
        res.status(400).json({ data: null, error: error });
    }
  }
  async getAll(req,res){
    try{
        const tinhThanhFindAll = await TinhThanh.find({})
        if(!tinhThanhFindAll){
            return res.status(404).json({data:null, error:error})
        }
        res.status(201).json({data:tinhThanhFindAll, error:null})
      }catch(error){
        res.status(400).json({ data: null, error: error });
      }

    }
    async get(req,res){
        try{
            const {_id} = req.params;
            const tinhThanhFind = await TinhThanh.findOne({_id})
            if(!tinhThanhFind){
                return res.status(404).json({data:null, error:error})
            }
            res.status(201).json({data:tinhThanhFind, error:null})
          }catch(error){
            res.status(400).json({ data: null, error: error });
          }
    
        }
}

module.exports = new TinhThanhController