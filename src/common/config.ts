import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
};
