import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { logger } from '../common/logger';

export const connectToDb = async (): Promise<void> => {
  try {
    console.log(config);
    await createConnection(config);
    logger.info('We are connected to DB');
  } catch (err) {
    throw new Error(err);
  }
};
