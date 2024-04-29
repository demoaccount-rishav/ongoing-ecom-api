import { Router } from 'express'
import UserController from './controllers/user.controller.js';

const UserRouter = Router()

const userController = new UserController();

// UserRouter.post('/signup', userController.signup);

// Modified for repository pattern
UserRouter.post('/signup', (req, res, next) => {
    userController.signup(req, res, next);
});

// UserRouter.post('/signin', userController.signin);
UserRouter.post('/signin', (req, res, next)=>{
    userController.signin(req, res, next);
});

export default UserRouter