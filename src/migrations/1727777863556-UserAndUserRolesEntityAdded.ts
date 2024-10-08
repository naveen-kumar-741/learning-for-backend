import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndUserRolesEntityAdded1727777863556 implements MigrationInterface {
    name = 'UserAndUserRolesEntityAdded1727777863556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_user_type_enum" AS ENUM('User', 'Super Admin', 'Admin')`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "user_type" "public"."user_roles_user_type_enum" NOT NULL DEFAULT 'User', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "roletypeUnique" UNIQUE ("user_id", "user_type"), CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "cognito_username" character varying, "email_id" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "mobile_number" integer, "profile_url" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "last_modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_e752aee509d8f8118c6e5b1d8cc" UNIQUE ("email_id"), CONSTRAINT "PK_ed9eff0c241ae28139f2e55d3e5" PRIMARY KEY ("u_id"))`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("u_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_user_type_enum"`);
    }

}
