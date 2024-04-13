let cartItemId = 0;

export default class CartModel {

    constructor(userId, productId, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.cartItemId = ++cartItemId;
    }

    static add(userId, productId, quantity) {
        cartItems.push(new CartModel(userId, productId, quantity));
        console.log(cartItems);
    }

    static getUserIdCart(userId) {
        return cartItems.filter(cartItem => cartItem.userId === userId)
    }

    static delete(cartItemId, userId) {
        const cartItemIndex = cartItems.findIndex(cartItem => cartItem.cartItemId == cartItemId && cartItem.userId == userId);

        if (cartItemIndex < 0) {
            return "Item not found"
        } else {
            cartItems.splice(cartItemIndex, 1);
        }
    }
}


let cartItems = [
    new CartModel(1, 1, 2),
    new CartModel(2, 2, 1),
]