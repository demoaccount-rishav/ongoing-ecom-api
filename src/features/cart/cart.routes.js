import { Router } from 'express'
import CartController from './controllers/cart.controller.js';

const CartRouter = Router()

const cartController = new CartController();

CartRouter.post('/', cartController.addCartItem);
CartRouter.get('/', cartController.get);
CartRouter.delete('/delete',cartController.delete)


export default CartRouter