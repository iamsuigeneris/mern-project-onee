const { create } = require('../models/Registration')
const Registration = require('../models/Registration')

module.exports = {
    async create(req, res){
        const { user_id } = req.headers
        const { event_id } = req.params
        const { date } = req.body

        const registration = await Registration.create({
            user: user_id,
            event: event_id,
            date
        })
        await registration
            .populate('event')
            .populate('user')
            .execPopulate('user','-password')

        return res.json(registration)
    },
    async getRegistration(req,res){
        const { registration_id } = req.params
        try {
            const registration = await Registration.findById(registration_id)
            await registration
            .populate('event')
            .populate('user')
            .execPopulate('user','-password')
            
            return res.json(registration)
        } catch (error) {
            return res.status(400).json({message:"Registration not found"})
        }
    }
}