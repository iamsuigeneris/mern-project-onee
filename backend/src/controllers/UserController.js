const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async createUser(req,res){
        try {
            console.log(req.body)
            const {firstName,lastName,email,password} = req.body

            const existingUser = await User.findOne({email})
            if(!existingUser){
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                })
                return res.json({
                    _id:user._id,
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName
                })
            }
            return res.status(400).json({
                message: "User already exist! do you want to login?"
            })
        } catch (error) {
            throw Error(`Error while registering new user ${error}`)
        }
    },

    async getUserById(req,res){
        const {user_id} = req.params

        try {
            const user = await User.findById(user_id)
            return res.json(user)
            
        } catch (error) {
            return res.status(400).json({
                message: "User ID does not exist, do you want to register?"
            })
        }
    }
}