import ProductModel from "../models/product.model.js"

export default class ProductController {

    getAllProduct(req, res) {
        const products = ProductModel.GetAll();
        return res.status(200).json(products)
    }

    addProduct(req, res) {
        const { name, desc, price, category, sizes } = req.body;
        let imageUrl = 'images/' + req.file.filename;
        const product = ProductModel.add(name, desc, parseFloat(price), imageUrl, category, sizes);
        console.log(product);
        return res.status(201).json({ 'message': 'successfully inserted product', 'product-data': product })
    }

    rateProduct(req, res) {

    }

    getOneProduct(req, res) {
        const product = ProductModel.Get(req.params.id);
        if (!product) {
            return res.status(404).json({ 'message': `Product Not Found With id: ${req.params.id}` })
        }
        else {
            return res.status(200).json({
                'message': `Product Found With id: ${req.params.id}`,
                'product-data': product,
            })
        }
    }
    
    // localhost:3200/api/products/filter?minPrice=10&maxPrice=30&category=Category1
    filterProducts(req, res) {
        const { minPrice, maxPrice, category } = req.query
        const arr = ProductModel.filterProd(parseFloat(minPrice), parseFloat(maxPrice), category)
        return res.status(200).json({ 'productsFound': arr })
    }
}