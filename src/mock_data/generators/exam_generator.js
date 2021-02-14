const _ = require('lodash');
const faker = require('faker');
const { toUpperCase } = require('../utils/index.js');
faker.seed(123);

// Exported
function generate() {
    // Half of the courses have 2 exams, half have 3
    return _.times(90, function (n) {
        return {
            id: faker.random.uuid(),
            name: toUpperCase(faker.random.words(2)),
            studentExams: [],
            course: null
        }
    })
}

module.exports = generate();