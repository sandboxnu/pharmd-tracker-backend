import { define } from 'typeorm-seeding';
import { Student } from '../../entity/Student';
import {
    semesters, statuses, entryTypes, startYears, endYears,
} from '../utils';

import { EntryType, StudentStatus } from '../../entity/Enums';

const usedNUIDs = [];

define(Student, (faker) => {
    const gradYear = faker.random.arrayElement(endYears);
    const gradSem = faker.random.arrayElement(semesters);
    const gradDateChanged = faker.random.boolean();

    // Nine digit number
    let id = faker.random.number({ min: 100000000, max: 999999999 });

    while (id in usedNUIDs) {
        id = faker.random.number({ min: 100000000, max: 999999999 });
    }

    const lastName = faker.name.lastName();
    const firstName = faker.name.firstName();
    const entryDate = faker.random.arrayElement(startYears).toString();
    const originalGradDate = gradYear.toString();
    const gradDate = gradDateChanged ? (gradYear + 1).toString() : gradYear.toString();
    const status = faker.random.arrayElement<StudentStatus>(statuses);
    const gpa = faker.random.number({ max: 4, min: 2, precision: 0.01 });
    const preferredName = faker.random.boolean() ? faker.name.firstName() : '';
    const gradDateChanges = gradDateChanged ? [gradSem + gradYear] : [];
    const entryType = faker.random.arrayElement<EntryType>(entryTypes);
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
});
