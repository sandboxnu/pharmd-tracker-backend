import { define } from "typeorm-seeding";
import { StudentCourse } from "../entity/StudentCourse";
import { LetterGrade } from "../entity/Enums";

import * as faker from 'faker';

faker.seed(123);

// TODO move to utils
function chooseFrom(options) {
    const x = faker.random.number(options.length - 1);
    return options[x];
}

function chooseLetterGrade(percentage) {
    if (percentage >= 93) {
        return LetterGrade.A;
    } else if (percentage >= 90) {
        return LetterGrade.A_MINUS;
    } else if (percentage >= 87) {
        return LetterGrade.B_PLUS;
    } else if (percentage >= 83) {
        return LetterGrade.B;
    } else if (percentage >= 80) {
        return LetterGrade.B_MINUS;
    } else if (percentage >= 77) {
        return LetterGrade.C_PLUS;
    } else if (percentage >= 73) {
        return LetterGrade.C;
    } else if (percentage >= 70) {
        return LetterGrade.C_MINUS;
    } else if (percentage >= 67) {
        return LetterGrade.D_PLUS;
    } else if (percentage >= 65) {
        return LetterGrade.D;
    } else if (percentage >= 63) {
        return LetterGrade.D_MINUS;
    } else {
        return LetterGrade.F;
    }
}

// =================================================

// TODO move to consts
const semesters = ['FL', 'SP', 'SU', 'S1', 'S2'];

// =================================================
const years = [2021, 2020, 2019, 2018, 2017, 2016];

define(StudentCourse, faker => {
    const semester = chooseFrom(semesters);
    const year = chooseFrom(years);
    const percentage = faker.random.number(100);
    const letterGrade = chooseLetterGrade(percentage);

    const studentCourse = new StudentCourse();
    studentCourse.semester = semester;
    studentCourse.year = year;
    studentCourse.percentage = percentage;
    studentCourse.letterGrade = letterGrade;

    return studentCourse;
})
