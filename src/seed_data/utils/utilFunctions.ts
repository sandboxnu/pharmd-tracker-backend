import { LetterGrade } from '../../entity/Enums';

export function toUpperCase(value: String) {
    const words = value.split(' ');
    const capitalizedWords = words.map((word: String) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })

    return capitalizedWords.join(' ');
}

export function chooseLetterGrade(percentage: number) {
    if (percentage >= 93) {
        return LetterGrade.A;
    } else if (percentage >= 90) {
        return LetterGrade.A_MINUS;
    } else if (percentage >= 87) {
        return LetterGrade.B_PLUS;
    } else if (percentage >= 83) {
        return LetterGrade.B;
    } else if (percentage >= 80) {
        return LetterGrade.B_MINUS;
    } else if (percentage >= 77) {
        return LetterGrade.C_PLUS;
    } else if (percentage >= 73) {
        return LetterGrade.C;
    } else if (percentage >= 70) {
        return LetterGrade.C_MINUS;
    } else if (percentage >= 67) {
        return LetterGrade.D_PLUS;
    } else if (percentage >= 65) {
        return LetterGrade.D;
    } else if (percentage >= 63) {
        return LetterGrade.D_MINUS;
    } else {
        return LetterGrade.F;
    }
}
