// import { Request, Response, NextFunction } from 'express';
import config from '../common/config';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
// import { getUserById } from '../resources/users/user.service';
// interface JwtPayload {
//   userId: string;
//   login: string;
// }
//import { verifyJWToken } from '../services/token.services';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    if (!config.JWT_SECRET_KEY) {
      throw new Error('rrrrr');
    }

    const { authorization } = req.headers;
    if (!authorization)
      throw new Error('You must send an Authorization header');

    const [authType, token] = authorization.split(' ');
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token');
    if (!token) throw new Error('rrrr');

    try {
      jwt.verify(token, config.JWT_SECRET_KEY);
    } catch (e) {
      throw new Error('rrr');
    }

    // const user = await getUserById(finalToken.userId);
    // if (!user) {
    //   return res.status(401).json({ msg: 'No token, authorization denied' });
    // }
    // const { user } = finalToken;

    // req.user = user;
    // req.user = finalToken.user;
    next();
    return;
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export { isAuthenticated };
