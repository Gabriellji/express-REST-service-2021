import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1624107735194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE "user" (
            id uuid primary key DEFAULT uuid_generate_v4 (), 
            name  VARCHAR (50)NOT NULL,
            login  VARCHAR (50) NOT NULL,
            password VARCHAR (50) NOT NULL
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
