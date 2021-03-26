import { define } from 'typeorm-seeding';
import { Course } from '../../entity/Course';
import { subjects, getRandomIntInclusive, toUpperCase } from '../utils'

import * as faker from 'faker';

faker.seed(123);

let courseNumbers = [];

function generateCourseNumber() {
    let num = faker.random.number();
    if (num < 1000) {
        num *= 1000;
    }

    let stringNum = num.toString().substring(0, 4);

    while (stringNum in courseNumbers) {
        num = faker.random.number();
        if (num < 1000) {
            num *= 1000;
        }
        stringNum = num.toString().substring(0, 4);
    }

    courseNumbers.push(stringNum);

    return parseInt(stringNum);
}

define(Course, faker => {
    const subject = subjects[getRandomIntInclusive(0, subjects.length - 1)];
    const number = generateCourseNumber();
    const name = toUpperCase(faker.random.words(3));

    const course = new Course();
    course.subject = subject;
    course.number = number;
    course.name = name;

    return course;
})
