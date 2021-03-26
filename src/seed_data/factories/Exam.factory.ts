import { define } from 'typeorm-seeding';
import { Exam } from '../../entity/Exam';
import { toUpperCase } from '../utils';

import * as faker from 'faker';

faker.seed(123);

define(Exam, faker => {
    const name = toUpperCase(faker.random.words(2));

    const exam = new Exam();
    exam.name = name;

    return exam;
})
