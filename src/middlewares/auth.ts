import { Request, Response, NextFunction } from 'express';
import config from '../common/config';
import { extractToken } from '../helpers';
import jwt from 'jsonwebtoken';
//import { verifyJWToken } from '../services/token.services';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!config.JWT_SECRET_KEY) {
      throw new Error('rrrrr');
    }
    const token = extractToken(req);
    const finalToken = jwt.verify(token, config.JWT_SECRET_KEY);
    // const isTokenValid = verifyJWToken(token);
    if (!finalToken) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    //const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    console.log(finalToken);
    // // res.locals.jwtPayload = decoded;
    // req.user = finalToken.user;
    next();
    return;
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
