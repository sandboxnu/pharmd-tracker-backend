import { createConnection } from "typeorm";
import { runSeeder, useSeeding } from "typeorm-seeding";
import CreateCourses from "./seeds/createCourses.seed";
import CreateStudents from "./seeds/createStudents.seed";

createConnection().then(async () => {
    await useSeeding();
    await runSeeder(CreateCourses);
    await runSeeder(CreateStudents);
});

// TODO

// GENERAL
// [ ] Move utils
// [ ] Reorganize directory structure
// [ ] Remove old mock data
// [ ] Write a README

// NOT CURRENTLY IN TABLES:
// [ ] student course table:
//      [ ] courseId
// [ ] student exam table:
//      [ ] studentId
//      [ ] examId