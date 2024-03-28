import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPhone1711608929782 implements MigrationInterface {
    name = 'RemovedPhone1711608929782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

}
