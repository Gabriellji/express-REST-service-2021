import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { connectToDb } from './common/db';
import { logger } from './common/logger';
import { createAdmin } from './resources/users/user.service';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT || 4000;

connectToDb()
  .then(() => {
    createAdmin();
    app.listen(PORT, () => {
      logger.info('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to db', err);
    process.exit(1);
  });
