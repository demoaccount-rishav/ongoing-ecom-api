import { getDb } from "../../../configs/mongodb.config.js";
import ApplicationError from "../../../error-handler/applicationError.js";
import UserModel from "../../user/models/user.model.js";

let id = 0;

export default class ProductModel {
    constructor(name, desc, price, imageUrl, category, sizes) {
        this.id = ++id
        this.name = name
        this.desc = desc;
        this.price = price
        this.imageUrl = imageUrl
        this.category = category
        this.sizes = sizes
    }

    // static GetAll() {
    //     return products;
    // }

    // static Get(id) {
    //     return products.find(product => product.id == id);
    // }

    // static add(name, desc, price, imageUrl, category, sizes) {
    //     const product = new ProductModel(name, desc, price, imageUrl, category, sizes.split(','))
    //     products.push(product);
    //     return product;
    // }

    // static filterProd(minPrice, maxPrice, category) {
    //     return products.filter(eachProduct => (!category || eachProduct.category == category) && (!minPrice || eachProduct.price >= minPrice) && (!maxPrice || eachProduct.price <= maxPrice))
    // }

    /*
    static rateProduct(userId, productId, rating) {
        const users = UserModel.getAllUsers();

        // validate user
        const validateUser = users.find((user) => user.id == userId)
        if (!validateUser) {
            // throw new Error("User not found");
            throw new ApplicationError("User not found", 400);
        }
        
        if (Object.keys(user).length == 0) {
            // throw new Error("User not found");
            console.log(Object.keys(user));
            throw new ApplicationError("User not found", 400);
        }

        // validate product
        const validateProduct = products.find((product) => product.id == productId);
        if (!validateProduct) {
            // throw new Error("Product not found");
            throw new ApplicationError("Product not found", 400);
        }

        if (!validateProduct.ratings) {
            validateProduct.ratings = []
            validateProduct.ratings.push({ 'userId': userId, "rating": rating });

        } else {

            const existingRatingIndex = validateProduct.ratings.findIndex((rating) => rating.userId == userId)

            if (existingRatingIndex > -1) {
                validateProduct.ratings[existingRatingIndex] = { 'userId': userId, "rating": rating };

            } else {
                validateProduct.ratings.push({ 'userId': userId, "rating": rating });
            }

        }

    }
    */

    static async rateProduct(userId, productId, rating) {
        // const users = UserModel.getAllUsers();

        // modifications due to repository structure of user repository
        const instanceDB = getDb();
        const usersCollection = instanceDB.collection("users");

        const user = await usersCollection.findOne({ id: userId });
        if (Object.keys(user).length == 0) {
            // throw new Error("User not found");
            throw new ApplicationError("User not found", 400);
        }

        // validate product
        const validateProduct = products.find((product) => product.id == productId);
        if (!validateProduct) {
            // throw new Error("Product not found");
            throw new ApplicationError("Product not found", 400);
        }

        if (!validateProduct.ratings) {
            validateProduct.ratings = []
            validateProduct.ratings.push({ 'userId': userId, "rating": parseFloat(rating) });

        } else {

            const existingRatingIndex = validateProduct.ratings.findIndex((rating) => rating.userId == userId)

            if (existingRatingIndex > -1) {
                validateProduct.ratings[existingRatingIndex] = { 'userId': userId, "rating": parseFloat(rating) };

            } else {
                validateProduct.ratings.push({ 'userId': userId, "rating": parseFloat(rating) });
            }
        }
    }
}

var products = [
    new ProductModel(
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1',
        ['M', 'XL']
    ),
    new ProductModel(
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M', 'XL', 'S']
    )];