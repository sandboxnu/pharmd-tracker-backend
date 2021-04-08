import { define } from 'typeorm-seeding';
import * as _ from 'lodash';
import { Note } from '../../entity/Note';
import { toUpperCase } from '../utils';

function createTagOptions(faker) {
    return _.times(10, () => faker.lorem.word());
}

function chooseTags(faker) {
    const numTags = faker.random.number(3);
    return faker.random.arrayElements(createTagOptions(faker), numTags);
}

define(Note, (faker) => {
    const title = toUpperCase(faker.lorem.words(3));
    const body = faker.lorem.paragraph(4);
    const tags = chooseTags(faker);

    const note = new Note();
    note.title = title;
    note.body = body;
    note.tags = tags;

    return note;
});
