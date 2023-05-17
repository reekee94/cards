import { MigrationInterface, QueryRunner } from 'typeorm';

export class card1684352635728 implements MigrationInterface {
  name = 'card1684352635728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "card_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_4b9394efa5bf6a1e98b254b3e6a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "ownerId" integer, "cardTypeId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_8037ee264b729d94b5306489ca0" FOREIGN KEY ("cardTypeId") REFERENCES "card_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_8037ee264b729d94b5306489ca0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "card_type"`);
  }
}
