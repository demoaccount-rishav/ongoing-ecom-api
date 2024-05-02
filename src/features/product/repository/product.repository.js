import { getDb } from "../../../configs/mongodb.config.js";
import ApplicationError from "../../../error-handler/applicationError.js";

class ProductRepository {

    constructor() {
        this.collection = "products";
    }

    add(instanceProductModel) {
        const { name, desc, price, imageUrl, category, sizes } = instanceProductModel;
        if (!name || !desc || !price || !imageUrl || !category || !sizes) {
            throw new ApplicationError("Signup fields are insufficient", 400);
        }

        // Get the database
        const instanceDB = getDb();

        // Get the collection
        const productsCollection = instanceDB.collection(this.collection);

        // Insert new user into the collection
        return productsCollection.insertOne(instanceProductModel)
            .then((result) => {
                console.log(`New product added to database with insertID: ${result.insertedId}`);
                return instanceProductModel;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't enter product into dataBase", 400);
            })
    }

    GetAll() {
        const instanceDB = getDb();
        const productsCollection = instanceDB.collection(this.collection);
        return productsCollection.find({}).toArray()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't perform find inside dataBase", 400);
            })
    }

    Get(id) {
        const instanceDB = getDb();
        const productsCollection = instanceDB.collection(this.collection);
        return productsCollection.findOne({ id })
            .then((prod) => {
                return prod;
            })
            .catch((err) => {
                throw new ApplicationError("Couldn't perform findOne inside dataBase", 400);
            })

    }

    filterProd(minPrice, maxPrice, category) {
        const instanceDB = getDb();
        const productsCollection = instanceDB.collection(this.collection);

        let filterExpression = {};

        if (minPrice) {
            filterExpression.price = { $gte: parseFloat(minPrice) }
        }

        if (maxPrice) {
            filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) }
        }

        if (category) {
            filterExpression.category = { $eq: category }
        }

        return productsCollection.find(filterExpression).toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                throw new ApplicationError("could not perform filterProduct", 400);
            })
    }

    rateProduct(userId, productId, rating) {
        if (!productId || !userId || !rating) {
            throw new ApplicationError("Rating fields are insufficient", 400);
        } else {
            const instanceDB = getDb();
            const productsCollection = instanceDB.collection(this.collection);

            /*
            // Method 1
            // 1. Find the product
            // 2. Find the rating
            const userRating = productsCollection.findOne({ id: productId })
                .then(product => {
                    return product?.ratings?.find(ratings => ratings.userId == userId);
                });
            if (userRating) {
                // 3. Update the rating
                return productsCollection.updateOne(
                    { id: productId, "ratings.userId": userId },
                    { $set: { "ratings.$.rating": rating } })
                    .then((res) => {
                        return res;
                    })
                    .catch(err => {
                        throw new ApplicationError("error performing rateProduct", 400);
                    })

            } else {
                return productsCollection.updateOne(
                    { id: productId },
                    { $push: { ratings: { userId, rating } } })
                    .then((res) => {
                        return res;
                    })
                    .catch(err => {
                        throw new ApplicationError("error performing rateProduct", 400);
                    })

            }
            */

            // Method 2
            return productsCollection.updateOne({ id: productId }, { $pull: { ratings: { userId } } })
                .then((val) => {
                    return productsCollection.updateOne({ id: productId }, { $push: { ratings: { userId, rating } } })
                        .then(val => {
                            return val;
                        })
                        .catch((err) => {
                            console.log(err); throw new ApplicationError("error performing rateProduct", 400);
                        })
                }).catch(err => {
                    throw new ApplicationError("error performing rateProduct", 400)
                })
        }
    }

    /*
    rateProduct(userId, productId, rating) {
        if (!productId || !userId || !rating) {
            throw new ApplicationError("Rating fields are insufficient", 400);
        } else {
            const instanceDB = getDb();
            const productsCollection = instanceDB.collection(this.collection);
            return productsCollection.updateOne(
                { id: productId },
                { $push: { ratings: { userId, rating } } })
                .then((res) => {
                    return res;
                })
                .catch(err => {
                    throw new ApplicationError("error performing rateProduct", 400);
                })
        }
    }
    */
}



export default ProductRepository