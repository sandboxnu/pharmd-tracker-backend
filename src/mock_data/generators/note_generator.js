const _ = require('lodash');
const faker = require('faker');
const { toUpperCase } = require('../utils/index.js');
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
    for (i = 0; i < numTags; i++) {
        const tagNum = faker.random.number(tagOptions.length - 1);
        const tag = tagOptions[tagNum];
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }

    return tags;
}

// Exported
function generate() {
    // Half the students have one note, the other half have 2
    return _.times(75, function (n) {
        return {
            id: faker.random.uuid(),
            title: toUpperCase(faker.lorem.words(3)),
            body: faker.lorem.paragraph(4),
            tags: chooseTags(),
            student: null
        }
    })
}

module.exports = generate();