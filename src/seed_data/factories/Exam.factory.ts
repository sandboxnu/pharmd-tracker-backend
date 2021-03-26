import { define } from 'typeorm-seeding';
import { Exam } from '../../entity/Exam';

import * as faker from 'faker';

faker.seed(123);

// TODO move to utils
function toUpperCase(value) {
    const words = value.split(' ');
    var i: number;
    for (i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
}

// =================================================

define(Exam, faker => {
    const name = toUpperCase(faker.random.words(2));

    const exam = new Exam();
    exam.name = name;

    return exam;
})
