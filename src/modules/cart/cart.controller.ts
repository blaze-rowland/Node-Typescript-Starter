import { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import Controller from '../../shared/interfaces/controller.interface';
import CartService from './cart.service';

class CartController implements Controller {
  public router = Router();
  private cartService = new CartService();

  constructor(public path: string) {
    this.initRoutes();
  }

  private initRoutes(): void {
    console.log(this.path);
    this.router.get(`${this.path}`, this.getCart);

    // Auth middleware example
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .post(`${this.path}/add`, authMiddleware, this.addToCart);
  }

  private getCart = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('Cart has 1 item');
  };

  private addToCart = (req: Request, res: Response, next: NextFunction) => {
    res.send('Added!');
  };
}

export default CartController;
