import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUserAddPhone1671892530108 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "phone",
                type: "varchar",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "phone");
    }
}
