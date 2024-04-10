import { Router } from 'express'
import UserController from './controllers/user.controller.js';

const UserRouter = Router()

const userController = new UserController();

UserRouter.post('/signup', userController.signup);
UserRouter.post('/signin', userController.signin);


export default UserRouter