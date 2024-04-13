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

    delete(req, res) {
        const userId = req.body.userId;
        const { cartItemId } = req.query;

        const error = CartModel.delete(cartItemId, userId);
        if (!error) {
            return res.status(201).json(
                {
                    'message': 'Items successfully deleted',
                }
            )
        } else {
            return res.status(401).json(
                {
                    'message': 'Item could not be deleted',
                }
            )
        }
    }
}