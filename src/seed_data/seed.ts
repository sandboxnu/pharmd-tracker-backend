import { Connection, createConnection, getConnection, getConnectionOptions } from "typeorm";
import { runSeeder, useSeeding } from "typeorm-seeding";
import { Course } from "../entity/Course";
import { Exam } from "../entity/Exam";
import { Note } from "../entity/Note";
import { Student } from "../entity/Student";
import { StudentCourse } from "../entity/StudentCourse";
import { StudentExam } from "../entity/StudentExam";
import CreateCourses from "./seeds/createCourses.seed";
import CreateStudents from "./seeds/createStudents.seed";

import * as ora from 'ora';

const seed = async () => {
    const connectionOptions = await getConnectionOptions('dev');
    createConnection({ ...connectionOptions, name: "default" }).then(async () => {
        const spinner = ora();
        spinner.start('Setting up seeding utilities');


        const connection: Connection = getConnection("default");
        await useSeeding({connection: connectionOptions.name})
            .then((_) => spinner.succeed())
            .catch(error => {
                console.log(error);
                spinner.fail();
                return;
            });

        // Run seeders
        spinner.start('Running seeders');
        spinner.stopAndPersist();
        await runSeeder(CreateCourses);
        await runSeeder(CreateStudents);

        console.log();
        spinner.start('Data has been seeded!')
        spinner.stopAndPersist();
    }).catch(error => {
        console.log(error);
        return;
    });
}

seed();

