const _ = require('lodash');
const faker = require('faker');
const { Semester } = require('../constants/index.js');
const { chooseFrom, chooseLetterGrade } = require('../utils/index.js');
const semesters = Object.values(Semester);
const years = [2021, 2020, 2019, 2018, 2017, 2016];

faker.seed(123);

// Exported
function generate() {
    // 1/4 (12) students have 2 courses (3 exams)
    // 1/2 (25) students have 4 courses (2 exams)
    // 1/4 (13) students have 8 courses (3 exams)
    return _.times(228, function (n) {
        const percentage = faker.random.number(100);
        return {
            id: faker.random.uuid(),
            semester: chooseFrom(semesters),
            year: chooseFrom(years),
            percentage: percentage, 
            letterGrade: chooseLetterGrade(percentage),
            student: null,
            course: null
        }
    })
}

module.exports = generate();