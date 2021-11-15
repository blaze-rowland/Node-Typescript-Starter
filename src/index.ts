import 'dotenv/config';
import App from './app';
import CartController from './modules/cart/cart.controller';

const app = new App([new CartController('/cart')]);

app.listen();
