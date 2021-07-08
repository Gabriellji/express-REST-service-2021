// import { Request, Response, NextFunction } from 'express';
import config from '../common/config';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { HttpCodes, StatusMsg, Bearer } from '../enums/enums';

const { UNAUTHORIZED } = HttpCodes;

const {
  NO_AUTHORIZATION_HEADER_MSG,
  NO_BEARER_TOKEN_TYPE_MSG,
  UNAUTHORIZED_MSG,
} = StatusMsg;
const { BEARER } = Bearer;

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    if (!config.JWT_SECRET_KEY) {
      throw new Error(UNAUTHORIZED_MSG);
    }

    const { authorization } = req.headers;

    if (!authorization) throw new Error(NO_AUTHORIZATION_HEADER_MSG);

    const [authType, token] = authorization.split(' ');

    if (authType !== BEARER) throw new Error(NO_BEARER_TOKEN_TYPE_MSG);
    if (!token) throw new Error(UNAUTHORIZED_MSG);

    try {
      jwt.verify(token, config.JWT_SECRET_KEY);
    } catch (err) {
      throw new Error(err);
    }
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json(UNAUTHORIZED_MSG);
  }
};

export { isAuthenticated };
