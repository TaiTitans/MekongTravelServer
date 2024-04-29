const MessageHistory = require('../models/messagehistory.model');
class MessageController{
    async createMessageHistory(req, res){
        try {
            const { CustomerMH, IntentMH, userId, message, intent, response } = req.body;
            const newMessageHistory = await MessageHistory.create({
              CustomerMH,
              IntentMH,
              userId,
              message,
              intent,
              response
            });
            res.status(201).json(newMessageHistory);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
    async getMessageHistory(req,res){
        try {
            const messageHistory = await MessageHistory.find();
            res.status(200).json(messageHistory);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
    async getMessageHistoryById(req,res){
        try {
            const messageHistory = await MessageHistory.findById(req.params.id);
            if (!messageHistory) {
              return res.status(404).json({ message: 'Message history not found' });
            }
            res.status(200).json(messageHistory);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
}
module.exports = new MessageController;
