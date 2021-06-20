import { MigrationInterface, QueryRunner } from 'typeorm';

export class Board1624109925459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE "board" (
            id uuid primary key DEFAULT uuid_generate_v4 (), 
            title VARCHAR (50) NOT NULL,
            columns ARRAY
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "board";`);
  }
}
