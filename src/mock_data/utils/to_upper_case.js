function toUpperCase(value) {
    const words = value.split(' ');
    for (i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
}

module.exports = toUpperCase;