import CartModel from "../models/cart.model.js";


export default class CartController {

    addCartItem(req, res) {
        const { productId, quantity } = req.query;
        const userId = req.body.userId;

        CartModel.add(userId, parseInt(productId), parseInt(quantity));
        return res.status(201).json({ 'message': 'Cart Item Is Added' });

    }

    get(req, res) {
        const userId = req.body.userId;
        const items = CartModel.getUserIdCart(userId);
        return res.status(200).json({
            'message': 'Items Found',
            'items': items,
        })
    }

    delete(req, res, next) {
        const userId = req.body.userId;
        const { cartItemId } = req.query;

        try {
            const deletedItem = CartModel.delete(cartItemId, userId);
            return res.status(201).json(
                {
                    'message': 'Items successfully deleted',
                    deletedItem,
                }
            )
        } catch (error) {
            next(error)
        }
    }
}