import { MigrationInterface, QueryRunner } from "typeorm";

export class card1728581753561 implements MigrationInterface {
    name = 'card1728581753561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "totalSteps" integer NOT NULL DEFAULT '0', "ownerId" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "counter" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "steps" integer NOT NULL DEFAULT '0', "teamId" integer NOT NULL, CONSTRAINT "PK_012f437b30fcf5a172841392ef3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_49a22109d0b97611c07768e37f1" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "counter" ADD CONSTRAINT "FK_66136b061354eff451585310a09" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "counter" DROP CONSTRAINT "FK_66136b061354eff451585310a09"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_49a22109d0b97611c07768e37f1"`);
        await queryRunner.query(`DROP TABLE "counter"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
