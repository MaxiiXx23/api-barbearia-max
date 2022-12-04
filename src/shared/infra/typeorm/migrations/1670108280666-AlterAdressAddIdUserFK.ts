import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AlterAdressAddIdUserFK1670108280666 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "adress",
            new TableColumn({
                name: "user_id",
                type: "uuid",
            })
        );

        await queryRunner.createForeignKey(
            "adress",
            new TableForeignKey({
                name: "FKUserId",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("adress", "FKUserId");
        await queryRunner.dropColumn("adress", "user_id");
    }
}
