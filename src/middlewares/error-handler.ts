import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logger } from '../common/logger';
import { finished } from 'stream';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'src/common/HttpException';

const logInfo = (req: Request, res: Response, next: NextFunction): void => {
  const { url, query, params, body, method } = req;
  const start = Date.now();

  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      JSON.stringify({
        method,
        url,
        statusCode,
        params,
        query,
        body,
        ms: `[${ms}ms]`,
      })
    );
  });
};

const errorHandler = async (
  err: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
