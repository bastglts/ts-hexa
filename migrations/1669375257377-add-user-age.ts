import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserAge1669375257377 implements MigrationInterface {
    name = 'addUserAge1669375257377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
