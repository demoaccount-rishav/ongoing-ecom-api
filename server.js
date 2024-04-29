import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';

import './env.js'
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
// import basicAuthoriser from './src/middlewares/basicAuthentication.middleware.js';
import jwtAuthorizer from './src/middlewares/jwt.middleware.js';
import CartRouter from './src/features/cart/cart.routes.js';
import swaggerDocument from './swagger.json' assert { type: "json" };
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import WinstonLoggerMiddleware from './src/middlewares/winston.logger.middleware.js';
import { defaultErrorHandlerMiddleware } from './src/middlewares/defaultErrorHandler.middleware.js';
import { connectToMongoDB } from './src/configs/mongodb.config.js';

const app = express();
const port = 3200;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('uploads'));
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(loggerMiddleware, WinstonLoggerMiddleware);
// app.use('/api/products', basicAuthoriser, ProductRouter);
app.use('/api/products', jwtAuthorizer, ProductRouter);
app.use('/api/users', UserRouter);
app.use('/api/cart', jwtAuthorizer, CartRouter);

app.get('/', (req, res) => {
    return res.send('Welcome To APIs');
})

app.use((req, res) => {
    return res.status(404).json({ 'message': 'API not found. Please refer to our doc. for more informations' });
})

app.use(defaultErrorHandlerMiddleware);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connectToMongoDB();
})