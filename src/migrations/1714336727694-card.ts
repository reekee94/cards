import { MigrationInterface, QueryRunner } from "typeorm";

export class card1714336727694 implements MigrationInterface {
    name = 'card1714336727694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "salary" ("id" integer NOT NULL, "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "employeeId" integer, CONSTRAINT "PK_3ac75d9585433a6264e618a6503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donation" ("id" integer NOT NULL, "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "currency" character varying NOT NULL DEFAULT 'USD', "amountInUSD" numeric(10,2), "exchangeRate" numeric(10,6), "employeeId" integer, CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" integer NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "departmentId" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "sign" character varying NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "salary" ADD CONSTRAINT "FK_ee746d55416ea53ee1d7b2eb3b7" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_a90d64bc1d8c672f30b711a942a" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_a90d64bc1d8c672f30b711a942a"`);
        await queryRunner.query(`ALTER TABLE "salary" DROP CONSTRAINT "FK_ee746d55416ea53ee1d7b2eb3b7"`);
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "donation"`);
        await queryRunner.query(`DROP TABLE "salary"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
