import { Router } from 'express'
import CartController from './controllers/cart.controller.js';

const CartRouter = Router()

const cartController = new CartController();

CartRouter.post('/', (req, res, next) => {
    cartController.addCartItem(req, res, next);
});

CartRouter.get('/', (req, res, next) => {
    cartController.getByUser(req, res, next);
});

CartRouter.delete('/delete', (req, res, next) => {
    cartController.deleteCartItem(req, res, next)
});


export default CartRouter