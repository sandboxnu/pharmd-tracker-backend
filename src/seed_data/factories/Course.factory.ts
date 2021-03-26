import { define } from 'typeorm-seeding';
import { Course } from '../../entity/Course';
import { subjects, getRandomIntInclusive, toUpperCase } from '../utils'

import * as faker from 'faker';

faker.seed(123);

let courseNumbers = [];

function generateCourseNumber() {
    let num = faker.random.number({min: 1000, max: 9999});

    while (num in courseNumbers) {
        num = faker.random.number({min: 1000, max: 9999});
    }

    courseNumbers.push(num);

    return num;
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
