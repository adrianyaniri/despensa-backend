import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678673866738 implements MigrationInterface {
    name = 'init1678673866738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'BASIC')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "edad" integer NOT NULL DEFAULT '0', "email" character varying NOT NULL, "first_name" character varying NOT NULL DEFAULT 'name', "last_name" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "fecha_nacimiento" date NOT NULL, "user_name" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_projects_access_level_enum" AS ENUM('40', '30')`);
        await queryRunner.query(`CREATE TABLE "user_projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."user_projects_access_level_enum" NOT NULL, "user_id" uuid, "project_id" uuid, CONSTRAINT "PK_3d2a17149b660c4f9183241b911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_86ef6061f6f13aa9252b12cbe87" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726"`);
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_86ef6061f6f13aa9252b12cbe87"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "user_projects"`);
        await queryRunner.query(`DROP TYPE "public"."user_projects_access_level_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
