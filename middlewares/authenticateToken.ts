import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import secret from '../config/secret';
import { RequestWithUser } from '../types';

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  // TODO: сделать также
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = +user.sub;
    next();
  });
};
