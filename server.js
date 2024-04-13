import express, { json, urlencoded } from 'express';

import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
// import basicAuthoriser from './src/middlewares/basicAuthentication.middleware.js';
import jwtAuthorizer from './src/middlewares/jwt.middleware.js';
import CartRouter from './src/features/cart/cart.routes.js';

const app = express();
const port = 3200;

app.use(express.static('uploads'));
app.use(urlencoded({ extended: true }))
app.use(json())

// app.use('/api/products', basicAuthoriser, ProductRouter);
app.use('/api/products', jwtAuthorizer, ProductRouter);
app.use('/api/users', UserRouter);
app.use('/api/cart', jwtAuthorizer, CartRouter);


app.get('/', (req, res) => {
    res.send('Welcome To APIs');
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})