import { ObjectId } from "mongodb";
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


        // Method 1. Puts new cart item with same quantity every time
        /*
        return cartItemsCollection.insertOne(instanceCartModel)
            .then((result) => {
                console.log(`New cart item added to database with insertID: ${result.insertedId}`);
                return instanceCartModel;
            })
            .catch(err => {
                throw new ApplicationError("Couldn't enter cart item into dataBase", 400);
            })
        */

        // Method 2: Using updateOne() optional parameters...
        return cartItemsCollection.updateOne(
            { productId, userId },
            { $inc: { quantity: quantity } },
            { upsert: true }
        )
            .then((result) => {
                // console.log(`Cart item added/updated in database: ${result}`);
                // return cartItemsCollection.findOne({ productId, userId }).then(obj => { return obj });
                console.log(result);
                return result;
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

    deleteOne(cartItemId, userId) {
        if (!userId || !cartItemId) {
            throw new ApplicationError("Either UserId field or cartItemId is empty to delete cart items", 400);
        }

        const db = getDb();
        const cartItemsCollection = db.collection(this.collection);
        return cartItemsCollection.deleteMany({ userId, _id: new ObjectId(cartItemId) })
            .then(result => {
                return result.deletedCount;
            })
            .catch(err => {
                throw new ApplicationError("Couldn't perform delete cartItem operation in database", 400);
            })
    }
}

export default CartRepository