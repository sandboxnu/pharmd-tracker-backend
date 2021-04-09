import { LetterGrade } from '../../entity/Enums';

export function toUpperCase(value: String) {
    const words = value.split(' ');
    const capitalizedWords = words.map((word: String) => word.charAt(0).toUpperCase() + word.slice(1));

    return capitalizedWords.join(' ');
}

export function chooseLetterGrade(percentage: number) {
    if (percentage >= 93) {
        return LetterGrade.A;
    } if (percentage >= 90) {
        return LetterGrade.A_MINUS;
    } if (percentage >= 87) {
        return LetterGrade.B_PLUS;
    } if (percentage >= 83) {
        return LetterGrade.B;
    } if (percentage >= 80) {
        return LetterGrade.B_MINUS;
    } if (percentage >= 77) {
        return LetterGrade.C_PLUS;
    } if (percentage >= 73) {
        return LetterGrade.C;
    } if (percentage >= 70) {
        return LetterGrade.C_MINUS;
    } if (percentage >= 67) {
        return LetterGrade.D_PLUS;
    } if (percentage >= 65) {
        return LetterGrade.D;
    } if (percentage >= 63) {
        return LetterGrade.D_MINUS;
    }
    return LetterGrade.F;
}
