import { define } from "typeorm-seeding";
import { StudentCourse } from "../../entity/StudentCourse";
import { chooseLetterGrade, semesters, years } from "../utils";

import * as faker from 'faker';

faker.seed(123);

define(StudentCourse, faker => {
    const semester = faker.random.arrayElement(semesters);
    const year = faker.random.arrayElement(years);
    const percentage = faker.random.number({min: 50, max: 100});
    const letterGrade = chooseLetterGrade(percentage);

    const studentCourse = new StudentCourse();
    studentCourse.semester = semester;
    studentCourse.year = year;
    studentCourse.percentage = percentage;
    studentCourse.letterGrade = letterGrade;

    return studentCourse;
})
