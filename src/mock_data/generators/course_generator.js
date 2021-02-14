const _ = require('lodash');
const faker = require('faker');
const { Subjects } = require('../constants/index.js');
const { toUpperCase } = require('../utils/index.js');
const subjects = Subjects.subjects;
faker.seed(123);

function generateCourseNumber() {
    let num = faker.random.number();
    if (num < 1000) {
        num *= 1000;
    }

    return parseInt(num.toString().substring(0, 4));
}

// 1/4 (12) students have 2 courses (3 exams)
// 1/2 (25) students have 4 courses (2 exams)
// 1/4 (13) students have 8 courses (3 exams)

// Exported
function generate() {
    return _.times(36, function (n) {
        return {
            id: faker.random.uuid(),
            subject: subjects[n % 6],
            number: generateCourseNumber(),
            name: toUpperCase(faker.random.words(3)),
            exams: [],
            studentCourses: []
        }
    })
}

module.exports = generate();