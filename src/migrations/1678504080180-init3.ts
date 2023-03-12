import { MigrationInterface, QueryRunner } from 'typeorm';

export class init31678504080180 implements MigrationInterface {
  name = 'init31678504080180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" DROP DEFAULT`,
    );
  }
}
