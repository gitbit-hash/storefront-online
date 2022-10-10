import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      try {
        const authUser = jwt.verify(token, process.env.JWT_SECRET as string);

        res.locals.verifiedUser = authUser;

        return next();
      } catch (err) {
        return res.status(401).json('Access denied, invalid/expired token');
      }
    }
    return res.status(401).json("Authentication token must be 'Bearer [token]");
  }
  return res.status(401).json('Authorization header must be provided');
};
