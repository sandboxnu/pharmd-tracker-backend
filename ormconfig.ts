require('dotenv').config();

module.exports = [
    {
        name: 'dev',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'pharmd',
        synchronize: true,
        logging: false,
        entities: [
            'src/entity/**/*.ts',
        ],
        migrations: [
            'src/migration/**/*.ts',
        ],
        subscribers: [
            'src/subscriber/**/*.ts',
        ],
        seeds: [
            'src/seed_data/seeds/**/*.ts',
        ],
        factories: [
            'src/seed_data/factories/**/*.ts',
        ],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
    {
        name: 'test',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'test',
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: [
            'src/entity/**/*.ts',
        ],
        migrations: [
            'src/migration/**/*.ts',
        ],
        subscribers: [
            'src/subscriber/**/*.ts',
        ],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    },
];
