import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedAtInMessage1728812361713 implements MigrationInterface {
    name = 'AddedCreatedAtInMessage1728812361713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
    }

}
