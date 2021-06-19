import { MigrationInterface, QueryRunner } from 'typeorm';

export class Board1624109925459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "board" (
            id uuid primary key, 
            title VARCHAR (50) UNIQUE NOT NULL,
            columns INTEGER
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "board";`);
  }
}
