const Customer = require('../models/customer.model')
const ErrorHandle = require('../middleware/error.middleware');
const bcrypt = require('bcrypt');
const generateAccessTokenCustomer = require('../middleware/generateAccessTokenCustomer');


class CustomerController{
    async dangky(req, res){
        try{
            const {username,email,password} = req.body;
            const existingAccount = await Customer.findOne({ username });
            if (existingAccount) {
              return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
  
          const newAccount = new Customer({
            username,
            email,
            password: hashedPassword, // Lưu mật khẩu đã được mã hóa vào cơ sở dữ liệu
        });
        await newAccount.save()
                res.status(201).json({data:newAccount, error:null})
        } catch(error){
            ErrorHandle(error, res); 
        }
    }
    async dangnhap(req,res){
        const{username, password} = req.body;
        try{
          const customer = await Customer.findOne({username})
          if(!customer){
            return res.status(404).json({message:"Tai Khoan Khong Ton Tai"})
          }
          const isMatch = await customer.comparePassword(password)
          if(!isMatch){
            return res.status(401).json({message:"Sai mat khau"})
          }
  
           // Generate token here
           const token = generateAccessTokenCustomer(customer);
          res.cookie('accessToken', token, { httpOnly: true, maxAge: 3600000 }); 
          res.status(200).json({data:{customer: customer.username},message:"Dang nhap thanh cong"})
  
        }catch(error){
            ErrorHandle(error, res); 
        }
      }
}

module.exports = new CustomerController;