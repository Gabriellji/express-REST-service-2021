import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { connectToDb } from './common/db';
import { logger } from './common/logger';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT || 4000;

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to db', err);
    process.exit(1);
  });
