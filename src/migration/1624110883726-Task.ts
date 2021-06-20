import { MigrationInterface, QueryRunner } from 'typeorm';

export class Task1624110051218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE "task" (
            id uuid primary key DEFAULT uuid_generate_v4 (), 
            title VARCHAR (50),
            "order" INTEGER,
            description VARCHAR (50),
            user_id uuid NOT NULL,
            board_id uuid NOT NULL,
            column_id uuid NOT NULL
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task";`);
  }
}
