import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

const namespace = 'test';
const TestConnection = {
  async create() {
    const connectionOptions = await getConnectionOptions(namespace);
    await createConnection({ ...connectionOptions, name: 'default' });
  },
  async close() {
    await getConnection('default').close();
  },
};

export default TestConnection;
