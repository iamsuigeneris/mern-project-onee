const express = require('express')
const multer = require('multer')
const verifyToken = require('./config/verifyToken')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req,res) => {
    res.send({status: 200})
})

// Registration
routes.post('/registration/:event_id',RegistrationController.create)
routes.get('/registration/:registration_id',RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals',ApprovalController.approval)
routes.post('/registration/:registration_id/rejections',RejectionController.rejection)

 
// login
routes.post('/login', LoginController.store)

// Dashboard
routes.get('/dashboard/:sport',verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard',verifyToken, DashboardController.getAllEvents)
routes.get('/user/:events',verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:event_id', verifyToken, DashboardController.getEventById)
// routes.get('/dashboard/:event_id', DashboardController.getEventById)

// Events
routes.post('/event',verifyToken, upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:event_id', verifyToken, EventController.delete)

// User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:user_id', UserController.getUserById)
 
module.exports = routes