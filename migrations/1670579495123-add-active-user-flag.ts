import { MigrationInterface, QueryRunner } from "typeorm";

export class addActiveUserFlag1670579495123 implements MigrationInterface {
    name = 'addActiveUserFlag1670579495123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

}
