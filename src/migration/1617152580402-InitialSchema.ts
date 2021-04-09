import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1617152580402 implements MigrationInterface {
    name = 'InitialSchema1617152580402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_edf6c605e2e55d5031073d46005"`);
        await queryRunner.query(`COMMENT ON COLUMN "note"."studentId" IS 'NUID'`);
        await queryRunner.query(`ALTER TABLE "student_course" DROP CONSTRAINT "FK_fe1f74de2fd433ac16a7260d268"`);
        await queryRunner.query(`ALTER TABLE "student_exam" DROP CONSTRAINT "FK_fb88bd040857cb2ec8159e685fc"`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."id" IS 'NUID'`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."entryDate" IS 'semester of entry'`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."originalGradDate" IS 'original semester of graduation (upon entry)'`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."gradDate" IS 'semester of graduation'`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_edf6c605e2e55d5031073d46005" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_course" ADD CONSTRAINT "FK_fe1f74de2fd433ac16a7260d268" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_exam" ADD CONSTRAINT "FK_fb88bd040857cb2ec8159e685fc" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_exam" DROP CONSTRAINT "FK_fb88bd040857cb2ec8159e685fc"`);
        await queryRunner.query(`ALTER TABLE "student_course" DROP CONSTRAINT "FK_fe1f74de2fd433ac16a7260d268"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_edf6c605e2e55d5031073d46005"`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."gradDate" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."originalGradDate" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."entryDate" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "student"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "student_exam" ADD CONSTRAINT "FK_fb88bd040857cb2ec8159e685fc" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_course" ADD CONSTRAINT "FK_fe1f74de2fd433ac16a7260d268" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "note"."studentId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_edf6c605e2e55d5031073d46005" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
