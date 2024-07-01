import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1719848066233 implements MigrationInterface {
    name = 'migrations1719848066233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio_image_comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "text" character varying NOT NULL, "portfolioImageId" integer, CONSTRAINT "PK_65ad500295cee91f7ee29c4afa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio_image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "data" bytea, "image_name" character varying NOT NULL, "image_description" character varying NOT NULL, "portfolioId" integer NOT NULL, CONSTRAINT "REL_cb9b2deac691d5df497afad485" UNIQUE ("portfolioId"), CONSTRAINT "PK_e2deb2982e8acdea22c1046fd8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio_image_comment" ADD CONSTRAINT "FK_5cac37198cabd8787ce9ad5f83c" FOREIGN KEY ("portfolioImageId") REFERENCES "portfolio_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_image" ADD CONSTRAINT "FK_cb9b2deac691d5df497afad4854" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_image" DROP CONSTRAINT "FK_cb9b2deac691d5df497afad4854"`);
        await queryRunner.query(`ALTER TABLE "portfolio_image_comment" DROP CONSTRAINT "FK_5cac37198cabd8787ce9ad5f83c"`);
        await queryRunner.query(`DROP TABLE "portfolio_image"`);
        await queryRunner.query(`DROP TABLE "portfolio_image_comment"`);
    }

    
}
