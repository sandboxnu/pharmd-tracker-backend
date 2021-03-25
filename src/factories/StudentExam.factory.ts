import { define } from 'typeorm-seeding';
import { StudentExam } from '../entity/StudentExam';
import { LetterGrade } from '../entity/Enums';

import * as faker from 'faker';

faker.seed(123);

// TODO move to utils
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

function chooseFrom(options) {
    const x = faker.random.number(options.length - 1);
    return options[x];
}

// =================================================

// TODO move to consts
const semesters = ['FL', 'SP', 'SU', 'S1', 'S2'];

// =================================================
define(StudentExam, faker => {
    const percentage = faker.random.number({ max: 100, min: 0, precision: 0.01 });
    const letterGrade = chooseLetterGrade(percentage);

    const studentExam = new StudentExam();
    studentExam.percentage = percentage;
    studentExam.letterGrade = letterGrade;

    return studentExam;
})