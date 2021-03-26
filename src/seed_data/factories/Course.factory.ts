import { define } from 'typeorm-seeding';
import { Course } from '../../entity/Course';

import * as faker from 'faker';

faker.seed(123);

// TODO move to consts
const subjects = ['PHMD', 'PHSC', 'AB', 'CD', 'BIOL', 'CHEM'];
// =================================================


// TODO move to utils
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function toUpperCase(value) {
    const words = value.split(' ');
    var i: number;
    for (i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
}

// =================================================
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
