import express from 'express'
import UserController from '../controller/user-controller.js'

const userController = new UserController()
const routerUser = express.Router()

routerUser.post('/registration', userController.createUser)
routerUser.post('/login', userController.loginUser)
routerUser.get('/activate/:link', userController.activate)

export default routerUser
