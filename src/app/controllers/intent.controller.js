const Intent = require('../models/intent.model');
class IntentController{
    async createIntent(req,res){
        try {
            const { name, examples, responses } = req.body;
            const newIntent = await Intent.create({
              name,
              examples,
              responses
            });
            res.status(201).json(newIntent);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
    async getIntents(req,res){
        try{
            const intents = await Intent.find();
            res.status(200).json(intents);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
    async getIntentById(req,res){
        try {
            const intent = await Intent.findById(req.params.id);
            if (!intent) {
              return res.status(404).json({ message: 'Intent not found' });
            }
            res.status(200).json(intent);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    }
}
module.exports = new IntentController