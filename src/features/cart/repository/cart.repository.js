import { getDb } from "../../../configs/mongodb.config.js";
import ApplicationError from "../../../error-handler/applicationError.js";

class CartRepository {

    constructor() {
        this.collection = "cartItems";
    }

    add(instanceCartModel) {
        const { userId, productId, quantity } = instanceCartModel;

        if (!userId || !productId || !quantity) {
            throw new ApplicationError("Cart add fields are insufficient", 400);
        }

        const db = getDb();
        const cartItemsCollection = db.collection(this.collection);

        return cartItemsCollection.insertOne(instanceCartModel)
            .then((result) => {
                console.log(`New cart item added to database with insertID: ${result.insertedId}`);
                return instanceCartModel;
            })
            .catch(err => {
                throw new ApplicationError("Couldn't enter cart item into dataBase", 400);
            })
    }

    getUserIdCart(userId) {
        if (!userId) {
            throw new ApplicationError("UserId field is empty to get cart items", 400);
        }

        const db = getDb();
        const cartItemsCollection = db.collection(this.collection);
        return cartItemsCollection.find({ userId }).toArray()
            .then((cartItems) => { return cartItems })
            .catch(err => {
                throw new ApplicationError("Could not perform getUserIdCart from the database", 400);
            })
    }

    delete(cartItemId, userId) {
        if (!userId || !cartItemId) {
            throw new ApplicationError("Either UserId field or cartItemId is empty to delete cart items", 400);
        }

        const db = getDb();
        const cartItemsCollection = db.collection(this.collection);
        return cartItemsCollection.deleteMany({ userId, cartItemId })
            .then(result => {
                return result.deletedCount;
            })
            .catch(err => {
                throw new ApplicationError("Couldn't perform delete cartItem operation in database", 400);
            })
    }
}

export default CartRepository       