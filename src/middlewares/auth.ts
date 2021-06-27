import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../common/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    if (!config.JWT_SECRET_KEY) {
      throw new Error('rrrrr');
    }
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    res.locals.jwtPayload = decoded;
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
