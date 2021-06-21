import { ConnectionOptions } from 'typeorm';
import commonConfig from './common/config';
import dotenv from 'dotenv';
import path from 'path';
const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = commonConfig;

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT) || 5433,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'password',
  database: POSTGRES_DB || 'postgres',
  entities: [`${__dirname}/entities/*.entity.ts`],
  synchronize: false,
  migrationsRun: true,
  connectTimeoutMS: 60000,
  migrations: [`${__dirname}/migration/*.ts`],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
