const Feedback = require('../models/feedback.model')



class FeedbackController{
    async create(req, res){
        try{
            const {name,email,description} = req.body;
  
          const newFeedback = new Feedback({
            name,
            email,
            description,
        });
        await newFeedback.save()
                res.status(201).json({data:newFeedback, error:null})
        } catch(error){
            ErrorHandle(error, res); 
        }
    }
    async getAll(req,res){
        try{
            const feedbackFindAll = await Feedback.find({})
            if(!feedbackFindAll){
                return res.status(404).json({data:null, error:error})
            }
            res.status(201).json({data:feedbackFindAll, error:null})
          }catch(error){
            res.status(400).json({ data: null, error: error });
          }
    
        }
        async update(req, res) {
            try {
                const {
                    _id,status
                } = req.body;
                const feedBackUpdate = await Feedback.findOne({
                    _id
                });
    
    
                if (!feedBackUpdate) {
                    return res.status(404).json({
                        data: null,
                        error: error
                    });
                }
    
    
                feedBackUpdate._id = _id;
                feedBackUpdate.status = status;
    
                await feedBackUpdate.save();
                return res.status(200).json({
                    data: feedBackUpdate,
                    error: null
                });
            } catch (error) {
                res.status(404).json({
                    data: null,
                    error: error
                })
    
    
            }
        }
}

module.exports = new FeedbackController;