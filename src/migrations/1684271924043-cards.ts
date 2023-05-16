import { MigrationInterface, QueryRunner } from "typeorm";

export class cards1684271924043 implements MigrationInterface {
    name = 'cards1684271924043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "UQ_c9dc71a83fa3e676bcdbe362c17" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "UQ_c9dc71a83fa3e676bcdbe362c17"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "ownerId"`);
    }

}
