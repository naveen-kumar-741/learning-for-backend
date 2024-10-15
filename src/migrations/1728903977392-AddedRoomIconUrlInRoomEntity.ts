import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRoomIconUrlInRoomEntity1728903977392 implements MigrationInterface {
    name = 'AddedRoomIconUrlInRoomEntity1728903977392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "room_icon_url" character varying`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "UQ_961a1f49541e3fffc268d86d5fc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "UQ_961a1f49541e3fffc268d86d5fc" UNIQUE ("room_name")`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "room_icon_url"`);
    }

}
