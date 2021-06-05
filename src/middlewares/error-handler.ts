import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logger } from '../common/logger';

import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'src/common/HttpException';

const logInfo = (req: Request) => {
  logger.info(
    JSON.stringify({ url: req.url, params: req.params, body: req.body })
  );
};

const errorHandler = async (
  err: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const status = err.status ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(
      JSON.stringify({
        status,
        message: getReasonPhrase(status),
      })
    );
    res.status(status).json({ message: getReasonPhrase(status) });
  }
  next();
};

export { logInfo, errorHandler };
