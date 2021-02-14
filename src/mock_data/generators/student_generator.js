const _ = require('lodash');
const faker = require('faker');
const { Semester, StudentStatus, EntryType } = require('../constants/index.js');
const { chooseFrom } = require('../utils/index.js');
const semesters = Object.values(Semester);
const statuses = Object.values(StudentStatus);
const entryTypes = Object.values(EntryType);
const startYears = [2018, 2017, 2016];
const endYears = [2020, 2021, 2022];

faker.seed(123);

// Exported
function generate() {
    return _.times(50, function (n) {
        const gradYear = chooseFrom(endYears);
        const gradSem = chooseFrom(semesters);
        const gradDateChanged = faker.random.number(1) == 1 ? true : false;
        return {
            id: 100000000 + n,
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            entryDate: chooseFrom(startYears).toString(),
            originalGradDate: gradYear,
            gradDate: gradDateChanged ? gradYear : (gradYear + 1),
            status: chooseFrom(statuses),
            gpa: faker.random.number({ max: 4, min: 0, precision: 0.01 }),
            preferredName: faker.random.number(1) == 1 ? faker.name.firstName() : "",
            gradDateChanges: gradDateChanged ? [gradSem + gradYear] : [],
            entryType: chooseFrom(entryTypes),
            hasVisa: n > 10 && n < 20,
            leftProgram: n % 5 == 0 ? true : false,
            studentCourses: [],
            studentExams: [],
            notes: []
        }
    })
}

module.exports = generate();