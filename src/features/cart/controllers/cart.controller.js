import CartModel from "../models/cart.model.js";
import CartRepository from "../repository/cart.repository.js";


export default class CartController {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    // addCartItem(req, res) {
    //     const { productId, quantity } = req.query;
    //     const userId = req.body.userId;

    //     CartModel.add(userId, parseInt(productId), parseInt(quantity));
    //     return res.status(201).json({ 'message': 'Cart Item Is Added' });

    // }


    addCartItem(req, res, next) {
        const { productId, quantity } = req.query;
        const userId = req.body.userId;

        try {
            const instanceCartModel = new CartModel(parseInt(userId), parseInt(productId), parseInt(quantity));
            this.cartRepository.add(instanceCartModel)
                .then((result) => {
                    if (result.upsertedCount == 1) {
                        return res.status(201).json({ 'message': 'New art item is added' });
                    } else {
                        return res.status(201).json({ 'message': 'Cart item quantity is updated' });
                    }
                })
        } catch (error) {
            next(error);
        }
    }

    // getByUser(req, res) {
    //     const userId = req.body.userId;
    //     const items = CartModel.getUserIdCart(userId);
    //     return res.status(200).json({
    //         'message': 'Items Found',
    //         'items': items,
    //     })
    // }

    getByUser(req, res, next) {
        const userId = req.body.userId;

        try {
            this.cartRepository.getUserIdCart(userId)
                .then((cartItems) => {
                    return res.status(200).json({
                        'message': `Cart items Found For UserId ${userId}`,
                        'items': cartItems,
                    })
                })
        } catch (error) {
            next(error);
        }
    }

    // deleteCartItem(req, res, next) {
    //     const userId = req.body.userId;
    //     const { cartItemId } = req.query;

    //     try {
    //         const deletedItem = CartModel.delete(cartItemId, userId);
    //         return res.status(201).json(
    //             {
    //                 'message': 'Items successfully deleted',
    //                 deletedItem,
    //             }
    //         )
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // deleteCartItem(req, res, next) {
    //     const userId = req.body.userId;
    //     const { cartItemId } = req.query;

    //     try {
    //         const deletedItem = CartModel.delete(cartItemId, userId);
    //         return res.status(201).json(
    //             {
    //                 'message': 'Items successfully deleted',
    //                 deletedItem,
    //             }
    //         )
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    deleteCartItem(req, res, next) {
        const userId = req.body.userId;
        const { cartItemId } = req.query;

        try {
            this.cartRepository.deleteOne(cartItemId, parseInt(userId))
                .then(deletedCount => {
                    if (deletedCount >= 1) {
                        return res.status(201).json(
                            {
                                'message': 'Item successfully deleted',
                            }
                        )
                    } else {
                        return res.status(201).json(
                            {
                                'message': 'No item was deleted',
                            }
                        )
                    }
                })
        } catch (error) {
            next(error)
        }
    }
}