import ProductModel from "../models/product.model.js"
import ProductRepository from "../repository/product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    // getAllProduct(req, res) {
    //     const products = ProductModel.GetAll();
    //     return res.status(200).json(products)
    // }

    getAllProduct(req, res, next) {
        try {
            this.productRepository.GetAll().then(products => {
                return res.status(200).json({ message: 'all the products in database', products });
            })
        } catch (err) {
            next(err);
        }
    }

    addProduct(req, res, next) {
        try {

            const { name, desc, price, category, sizes } = req.body;
            let imageUrl = 'images/' + req.file.filename;

            const instanceProductModel = new ProductModel(name, desc, parseFloat(price), imageUrl, category, sizes);

            this.productRepository.add(instanceProductModel).then(product => {
                return res.status(201).json({ 'message': 'successfully inserted product', 'product-data': product })
            })

        } catch (err) {
            next(err);
        }
    }

    rateProduct(req, res, next) {
        // const { userId, productId, rating } = req.query;
        const { productId, rating } = req.query;
        const userId = req.body.userId;
        try {
            // await ProductModel.rateProduct(userId, productId, rating)
            // return res.status(200).json({ 'message': 'Product Rated Successfully' });
            this.productRepository.rateProduct(userId, parseInt(productId), parseFloat(rating)).then((val) => {
                return res.status(200).json({ 'message': 'Product Rated Successfully' });
            })
        } catch (error) {
            next(error);
        }
    }

    // getOneProduct(req, res, next) {
    //     const product = ProductModel.Get(req.params.id);
    //     if (!product) {
    //         return res.status(404).json({ 'message': `Product Not Found With id: ${req.params.id}` })
    //     }
    //     else {
    //         return res.status(200).json({
    //             'message': `Product Found With id: ${req.params.id}`,
    //             'product-data': product,
    //         })
    //     }
    // }

    getOneProduct(req, res, next) {
        try {
            this.productRepository.Get(parseInt(req.params.id)).then(product => {
                if (!product) {
                    return res.status(404).json({ 'message': `Product Not Found With id: ${req.params.id}` })
                } else {
                    return res.status(200).json({
                        'message': `Product Found With id: ${req.params.id}`,
                        'product-data': product,
                    })
                }
            })
        } catch (error) {
            next(error)
        }
    }

    // localhost:3200/api/products/filter?minPrice=10&maxPrice=30&category=Category1
    filterProducts(req, res, next) {
        const { minPrice, maxPrice, category } = req.query
        try {
            this.productRepository.filterProd(parseFloat(minPrice), parseFloat(maxPrice), category)
                .then(products => {
                    if (products.length > 0) {
                        return res.status(200).json({ "msg": "products found", 'productsFound': products });
                    }
                    else {
                        return res.status(404).json({ "msg": "products not found", 'productsFound': products });
                    }
                })
        } catch (error) {
            next(error)
        }
    }
}