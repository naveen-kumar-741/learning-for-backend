import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedJoinTableInRoomAndUserEntity1728577437342 implements MigrationInterface {
    name = 'AddedJoinTableInRoomAndUserEntity1728577437342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_user_type_enum" AS ENUM('User', 'Super Admin', 'Admin')`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "u_id" uuid NOT NULL, "user_type" "public"."user_roles_user_type_enum" NOT NULL DEFAULT 'User', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "roletypeUnique" UNIQUE ("u_id", "user_type"), CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("message_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying, "u_id" uuid, "room_id" uuid, CONSTRAINT "PK_6187089f850b8deeca0232cfeba" PRIMARY KEY ("message_id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("room_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "room_name" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "last_modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a54158a6ef7c66aaa81e7aa2421" PRIMARY KEY ("room_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "cognito_username" character varying, "email_id" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "mobile_number" integer, "profile_url" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "last_modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_e752aee509d8f8118c6e5b1d8cc" UNIQUE ("email_id"), CONSTRAINT "PK_ed9eff0c241ae28139f2e55d3e5" PRIMARY KEY ("u_id"))`);
        await queryRunner.query(`CREATE TABLE "user_room_mappings" ("room_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d0b471864b379df4e6026e83a06" PRIMARY KEY ("room_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb81012924ac7f5913a6b7a2f2" ON "user_room_mappings" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_df20a7b758ce1e694ec14c2512" ON "user_room_mappings" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_42ff2412dd1755ef894490115b1" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_8a5e6f709e56e07f07d672f583d" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" ADD CONSTRAINT "FK_fb81012924ac7f5913a6b7a2f25" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" ADD CONSTRAINT "FK_df20a7b758ce1e694ec14c2512e" FOREIGN KEY ("user_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_room_mappings" DROP CONSTRAINT "FK_df20a7b758ce1e694ec14c2512e"`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" DROP CONSTRAINT "FK_fb81012924ac7f5913a6b7a2f25"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_8a5e6f709e56e07f07d672f583d"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_42ff2412dd1755ef894490115b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df20a7b758ce1e694ec14c2512"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb81012924ac7f5913a6b7a2f2"`);
        await queryRunner.query(`DROP TABLE "user_room_mappings"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_user_type_enum"`);
    }

}
