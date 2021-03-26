import * as faker from 'faker';
import { LetterGrade } from '../../entity/Enums';

export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function toUpperCase(value: String) {
    const words = value.split(' ');
    var i: number;
    for (i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
}

export function chooseFrom(options: any[]) {
    const x = faker.random.number(options.length - 1);
    return options[x];
}

export function chooseLetterGrade(percentage: number) {
    let orderedBreakpoints: number[] = [93, 90, 87, 83, 80, 77, 73, 70, 67, 65, 63, 0];
    let conversions: { [key: number]: LetterGrade } = {
        93: LetterGrade.A,
        90: LetterGrade.A_MINUS,
        87: LetterGrade.B_PLUS,
        83: LetterGrade.B,
        80: LetterGrade.B_MINUS,
        77: LetterGrade.C_PLUS,
        73: LetterGrade.C,
        70: LetterGrade.C_MINUS,
        67: LetterGrade.D_PLUS,
        65: LetterGrade.D,
        63: LetterGrade.D_MINUS,
        0: LetterGrade.F
    }

    orderedBreakpoints.forEach((breakpoint: number) => {
        if (percentage >= breakpoint) {
            return conversions[breakpoint];
        }
    })

    return LetterGrade.F;
    // TODO: revert this util, it returns all Fs
}
