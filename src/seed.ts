import { Connection, createConnection, getConnection } from "typeorm";
import { runSeeder, useSeeding } from "typeorm-seeding";
import { Course } from "./entity/Course";
import { Exam } from "./entity/Exam";
import { Note } from "./entity/Note";
import { Student } from "./entity/Student";
import { StudentCourse } from "./entity/StudentCourse";
import { StudentExam } from "./entity/StudentExam";
import CreateCourses from "./seeds/createCourses.seed";
import CreateStudents from "./seeds/createStudents.seed";

createConnection().then(async () => {
    await useSeeding();

    const connection: Connection = getConnection();

    // This deletes all data, regardless of foreign keys. Should never happen in production.
    console.log('Emptying StudentExam table ...');
    await connection.getRepository(StudentExam).delete({});

    console.log('Emptying Exam table ...');
    await connection.getRepository(Exam).delete({});

    console.log('Emptying StudentCourse Table ...');
    await connection.getRepository(StudentCourse).delete({});

    console.log('Emptying Course table ...');
    await connection.getRepository(Course).delete({});

    console.log('Emptying Note table ...');
    await connection.getRepository(Note).delete({});

    console.log('Emptying Student table ...');
    await connection.getRepository(Student).delete({});

    // Run seeders
    await runSeeder(CreateCourses);
    await runSeeder(CreateStudents);
});

// TODO

// GENERAL
// [ ] Move utils
// [ ] Reorganize directory structure
// [ ] Remove old mock data
// [ ] Write a README
// [ ] Fix new lines in console
