import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1719847128296 implements MigrationInterface {
    name = 'migrations1719847128296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "imageId" integer, "ownerId" integer, CONSTRAINT "REL_ab63f2dea6aeb0ff1a66a37edb" UNIQUE ("imageId"), CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_78e28bb95978a17af3dfdea87ed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_78e28bb95978a17af3dfdea87ed"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
    }

}

