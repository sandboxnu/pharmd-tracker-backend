import { define } from 'typeorm-seeding';
import { StudentExam } from '../../entity/StudentExam';
import { chooseLetterGrade } from '../utils';

define(StudentExam, (faker) => {
    const percentage = faker.random.number({ max: 100, min: 50, precision: 0.01 });
    const letterGrade = chooseLetterGrade(percentage);

    const studentExam = new StudentExam();
    studentExam.percentage = percentage;
    studentExam.letterGrade = letterGrade;

    return studentExam;
});
