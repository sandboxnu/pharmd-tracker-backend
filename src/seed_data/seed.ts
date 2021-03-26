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

        // This deletes all data, regardless of foreign keys. Should never happen in production.
        spinner.start('Emptying StudentExam table');
        await connection.getRepository(StudentExam).delete({}).then((_) => spinner.succeed());

        spinner.start('Emptying Exam table');
        await connection.getRepository(Exam).delete({}).then((_) => spinner.succeed());

        spinner.start('Emptying StudentCourse table');
        await connection.getRepository(StudentCourse).delete({}).then((_) => spinner.succeed());

        spinner.start('Emptying Course table');
        await connection.getRepository(Course).delete({}).then((_) => spinner.succeed());

        spinner.start('Emptying Note table');
        await connection.getRepository(Note).delete({}).then((_) => spinner.succeed());

        spinner.start('Emptying Student table');
        await connection.getRepository(Student).delete({}).then((_) => spinner.succeed());

        console.log();

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

