const faker = require('faker');

function chooseFrom(options) {
    const x = faker.random.number(options.length - 1);
    return options[x];
}

module.exports = chooseFrom;