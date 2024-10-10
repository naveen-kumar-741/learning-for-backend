import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueConstraintOnRoomName1728583783936 implements MigrationInterface {
    name = 'AddedUniqueConstraintOnRoomName1728583783936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "UQ_961a1f49541e3fffc268d86d5fc" UNIQUE ("room_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "UQ_961a1f49541e3fffc268d86d5fc"`);
    }

}
