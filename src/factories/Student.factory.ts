import { define } from "typeorm-seeding";
import { Student } from "../entity/Student";

import * as faker from 'faker';

faker.seed(123);

// TODO move to utils
function chooseFrom(options) {
    const x = faker.random.number(options.length - 1);
    return options[x];
}

// =================================================

// TODO move to consts
const semesters = ['FL', 'SP', 'SU', 'S1', 'S2'];
const statuses = ['ENROLLED', 'LEAVE', "DROP_BACK", 'COOP', 'GRADUATED'];
const entryTypes = ['EA', 'DE'];

// =================================================
const startYears = [2018, 2017, 2016];
const endYears = [2020, 2021, 2022];

let usedNUIDs = [];

define(Student, faker => {
    const gradYear = chooseFrom(endYears);
    const gradSem = chooseFrom(semesters);
    const gradDateChanged = faker.random.number(1) == 1 ? true : false;

    let id = Math.floor((Math.random() + 1) * 1000000000)

    while (id in usedNUIDs) {
        id = Math.floor((Math.random() + 1) * 1000000000);
    }

    const lastName = faker.name.lastName();
    const firstName = faker.name.firstName();
    const entryDate = chooseFrom(startYears).toString();
    const originalGradDate = gradYear;
    const gradDate = gradDateChanged ? (gradYear + 1) : gradYear;
    const status = chooseFrom(statuses);
    const gpa = faker.random.number({ max: 4, min: 0, precision: 0.01 });
    const preferredName =  faker.random.number(1) == 1 ? faker.name.firstName() : "";
    const gradDateChanges = gradDateChanged ? [gradSem + gradYear] : [];
    const entryType = chooseFrom(entryTypes);
    const hasVisa = faker.random.boolean();
    const leftProgram = faker.random.boolean();

    const student = new Student();
    student.id = id.toString();
    student.lastName = lastName;
    student.firstName = firstName;
    student.entryDate = entryDate;
    student.originalGradDate = originalGradDate;
    student.gradDate = gradDate;
    student.status = status;
    student.gpa = gpa;
    student.preferredName = preferredName;
    student.gradDateChanges = gradDateChanges;
    student.entryType = entryType;
    student.hasVisa = hasVisa;
    student.leftProgram = leftProgram;

    return student;
})
