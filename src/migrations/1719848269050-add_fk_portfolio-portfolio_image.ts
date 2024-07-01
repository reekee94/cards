import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1719848269050 implements MigrationInterface {
    name = 'migrations1719848269050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1" FOREIGN KEY ("imageId") REFERENCES "portfolio_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1"`);
    }

}
