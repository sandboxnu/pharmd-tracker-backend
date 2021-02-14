const _ = require('lodash');
const faker = require('faker');
const { chooseLetterGrade }  = require('../utils/index.js');
faker.seed(123);

// Exported
function generate() {
    return _.times(570, function (n) {
        const percentage = faker.random.number({max: 100, min: 0, precision: 0.01})
        return {
            id: faker.random.uuid(),
            semester: null,
            year: null,
            percentage: percentage,
            letterGrade: chooseLetterGrade(percentage),
            student: null,
            exam: null
        }
    })
}

module.exports = generate();