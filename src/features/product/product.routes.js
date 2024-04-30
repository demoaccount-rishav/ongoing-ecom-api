import express from 'express'
import ProductController from './controllers/product.controller.js';
import upload from '../../middlewares/fileupload.middleware.js'

const ProductRouter = express.Router()

const productController = new ProductController();

// ProductRouter.get('/rate', productController.rateProduct)
ProductRouter.get('/rate', (req, res, next)=>{
    productController.rateProduct(req, res, next)
});

// ProductRouter.get('/filter', productController.filterProducts);
ProductRouter.get('/filter', (req, res, next) => {
    productController.filterProducts(req, res, next)
});
// ProductRouter.get('/', productController.getAllProduct)
ProductRouter.get('/', (req, res, next) => {
    productController.getAllProduct(req, res, next);
})

ProductRouter.post('/', upload.single('imageUrl'), (req, res, next) => {
    productController.addProduct(req, res, next);
})
ProductRouter.get('/:id', (req, res, next) => {
    productController.getOneProduct(req, res, next);
});


export default ProductRouter