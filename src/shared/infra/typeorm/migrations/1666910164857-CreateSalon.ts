import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSalon1666906678321 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "salon",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "slogan",
                        type: "varchar",
                    },
                    {
                        name: "photo",
                        type: "varchar",
                    },
                    {
                        name: "adress_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_adress",
                        referencedTableName: "adress",
                        referencedColumnNames: ["id"],
                        columnNames: ["adress_id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("salon", "fk_adress");
        await queryRunner.dropTable("salon");
    }
}
