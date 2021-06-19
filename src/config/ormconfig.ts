import { ConnectionOptions } from 'typeorm';

const common: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +!process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: !process.env.RUN_MIGRATIONS,
};

module.exports = [
  {
    ...common,
    logging: true,
    name: 'default',
    synchronize: false,
    entities: ['build/entities/*.entity.js'],
    migrationsTableName: '__migrations',
    migrations: ['build/migration/*.js'],
    cli: {
      migrationsDir: 'src/migration',
    },
  },
  {
    ...common,
    name: 'data-import',
    entities: [`${__dirname}/src/entities/*.entity.ts`],
    migrationsTableName: '__migrations',
    migrations: [`${__dirname}/src/migration/*.ts`],
  },
];
