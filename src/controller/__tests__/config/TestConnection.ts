import {createConnection, getConnection, getConnectionOptions} from "typeorm";

const namespace = "test";
export const TestConnection = {
    async create() {
        const connectionOptions = await getConnectionOptions(namespace);
        await createConnection({...connectionOptions, name: "default"});
    },
    async close() {
        await getConnection(namespace).close();
    },
};

