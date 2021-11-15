import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../modules/user/user.service';
import MissingTokenException from '../shared/exceptions/MissingTokenException';
import WrongTokenException from '../shared/exceptions/WrongTokenException';
import DataStoredInToken from '../shared/interfaces/dataStoredInToken.interface';

const userService = new UserService();

async function authMiddleware(
  request: Request | any,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = await userService.getUser(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongTokenException());
      }
    } catch (err) {
      next(new WrongTokenException());
    }
  } else {
    next(new MissingTokenException());
  }
}

export default authMiddleware;
