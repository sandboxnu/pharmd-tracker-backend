import { define } from 'typeorm-seeding';
import { Course } from '../../entity/Course';
import { subjects, toUpperCase } from '../utils'

import * as faker from 'faker';

faker.seed(123);

let courseNumbers = [];

function generateCourseNumber() {
    // There are warnings printed to the console that faker.random.number is being deprecated
    // and that it is now located in faker.datatype.number -- this does not compile on my machine though,
    // and judging from the GitHub Issue, it's been pretty recently worked on. 
    // Issue: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/52010

    // Keeping faker.random.number in for now since it works and the suggested solution doesn't. May
    // have to circle back to this.
    let num = faker.random.number({min: 1000, max: 9999});

    while (num in courseNumbers) {
        num = faker.random.number({min: 1000, max: 9999});
    }

    courseNumbers.push(num);

    return num;
}

define(Course, faker => {
    const subject = subjects[faker.random.number({min: 0, max: subjects.length - 1})];
    const number = generateCourseNumber();
    const name = toUpperCase(faker.random.words(3));

    const course = new Course();
    course.subject = subject;
    course.number = number;
    course.name = name;

    return course;
})
