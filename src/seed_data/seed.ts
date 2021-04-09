import {
    createConnection, getConnectionOptions,
} from 'typeorm';
import { runSeeder, useSeeding } from 'typeorm-seeding';
import * as ora from 'ora';
import CreateCourses from './seeds/createCourses.seed';
import CreateStudents from './seeds/createStudents.seed';

const seed = async () => {
    const connectionOptions = await getConnectionOptions('dev');
    createConnection({ ...connectionOptions, name: 'default' }).then(async () => {
        const spinner = ora();
        spinner.start('Setting up seeding utilities');

        await useSeeding({ connection: connectionOptions.name })
            .then(() => spinner.succeed())
            .catch((error) => {
                console.log(error);
                spinner.fail();
            });

        // Run seeders
        spinner.start('Running seeders');
        spinner.stopAndPersist();
        await runSeeder(CreateCourses);
        await runSeeder(CreateStudents);

        console.log();
        spinner.start('Data has been seeded!');
        spinner.stopAndPersist();
    }).catch((error) => {
        console.log(error);
    });
};

seed();
