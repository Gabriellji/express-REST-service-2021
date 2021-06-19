import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1624107735194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
            id uuid primary key, 
            name  VARCHAR (50) UNIQUE NOT NULL,
            login  VARCHAR (50) UNIQUE NOT NULL,
            password VARCHAR (50) NOT NULL
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
