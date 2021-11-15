import { NextFunction, Response, Request } from 'express';
import HttpException from '../shared/exceptions/HttpException';

function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ message, status });
}

export default errorMiddleware;
