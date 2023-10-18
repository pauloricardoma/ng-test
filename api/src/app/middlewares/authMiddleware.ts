import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

export default function authMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const { id, username, accountId } = data as IUser;

    request.user = {
      id,
      username,
      accountId,
    };

    return next();
  } catch {
    return response.sendStatus(401);
  }
}
