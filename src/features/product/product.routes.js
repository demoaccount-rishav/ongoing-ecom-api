import express from 'express'
import ProductController from './controllers/product.controller.js';
import upload from '../../middlewares/fileupload.middleware.js'

const ProductRouter = express.Router()

const productController = new ProductController();

ProductRouter.get('/filter', productController.filterProducts);
ProductRouter.get('/', productController.getAllProduct)
ProductRouter.post('/', upload.single('imageUrl'), productController.addProduct)
ProductRouter.get('/:id', productController.getOneProduct);


export default ProductRouter