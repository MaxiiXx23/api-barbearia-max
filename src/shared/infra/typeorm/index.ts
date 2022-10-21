import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "barbearia_DB",
    password: "max123456",
    database: "barbearia",
    entities: ["./src/modules/**/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(host = "barbearia_max"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}

export { dataSource };
