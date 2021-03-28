import { define } from "typeorm-seeding";
import { Student } from "../../entity/Student";
import { chooseFrom, semesters, statuses, entryTypes, startYears, endYears } from "../utils";

import * as faker from 'faker';

faker.seed(123);

let usedNUIDs = [];

define(Student, faker => {
    const gradYear = chooseFrom(endYears);
    const gradSem = chooseFrom(semesters);
    const gradDateChanged = faker.random.boolean();

    // Nine digit number
    let id = faker.random.number({min: 100000000, max: 999999999})

    while (id in usedNUIDs) {
        id = id = faker.random.number({min: 100000000, max: 999999999})
    }

    const lastName = faker.name.lastName();
    const firstName = faker.name.firstName();
    const entryDate = chooseFrom(startYears).toString();
    const originalGradDate = gradYear;
    const gradDate = gradDateChanged ? (gradYear + 1) : gradYear;
    const status = chooseFrom(statuses);
    const gpa = faker.random.number({ max: 4, min: 2, precision: 0.01 });
    const preferredName =  faker.random.boolean() ? faker.name.firstName() : "";
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
