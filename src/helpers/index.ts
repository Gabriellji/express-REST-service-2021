import { Request } from 'express';
import { get } from 'lodash';

export const extractToken = (req: Request): string =>
  get(req, 'headers.authorization', '').replace('Bearer ', '');
