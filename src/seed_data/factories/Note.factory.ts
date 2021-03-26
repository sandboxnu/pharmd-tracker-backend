import { define } from "typeorm-seeding";
import { Note } from "../../entity/Note";
import { toUpperCase } from "../utils";

import * as faker from 'faker';
import * as _ from 'lodash';

faker.seed(123);

const tagOptions = createTagOptions();

function createTagOptions() {
    return _.times(10, function (n) {
        return faker.lorem.word();
    });
}

function chooseTags() {
    const numTags = faker.random.number(3);
    let tags = [];
    var i: number;
    for (i = 0; i < numTags; i++) {
        const tagNum = faker.random.number(tagOptions.length - 1);
        const tag = tagOptions[tagNum];
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }

    return tags;
}

define(Note, faker => {
    const title = toUpperCase(faker.lorem.words(3));
    const body = faker.lorem.paragraph(4);
    const tags = chooseTags();

    const note = new Note();
    note.title = title;
    note.body = body;
    note.tags = tags;

    return note;
})
