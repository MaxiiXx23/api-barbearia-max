import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateServicesSalon1670880489230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services_salons",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "service_id",
                        type: "uuid",
                    },
                    {
                        name: "salon_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "services_salons",
            new TableForeignKey({
                name: "FkService",
                referencedTableName: "services",
                referencedColumnNames: ["id"],
                columnNames: ["service_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "services_salons",
            new TableForeignKey({
                name: "FkSalon",
                referencedTableName: "salon",
                referencedColumnNames: ["id"],
                columnNames: ["salon_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("services_salons", "FkService");
        await queryRunner.dropForeignKey("services_salons", "FkSalon");
        await queryRunner.dropTable("services_salons");
    }
}
