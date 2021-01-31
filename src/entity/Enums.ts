export enum Semester {
    FALL = 'FL',
    SPRING = 'SP',
    SUMMER = 'SU',
    SUMMER1 = 'S1',
    SUMMER2 = 'S2'
}

export enum LetterGrade {
    A = 'A',
    A_MINUS = 'A-',
    B_PLUS = 'B+',
    B = 'B',
    B_MINUS = 'B-',
    C_PLUS = 'C+',
    C = 'C',
    C_MINUS = 'C-',
    D_PLUS = 'D+',
    D = 'D',
    D_MINUS = 'D-',
    F = 'F'
}

export enum StudentStatus {
    ENROLLED= 'ENROLLED',
    LEAVE = 'LEAVE',
    DROP_BACK = "DROP_BACK",
    COOP = 'COOP',
    GRADUATED = 'GRADUATED'
}

// TODO: is there more than just the F1 visa
// export enum Visa {
//     F1 = 'F1,',
//     NONE = ''
// }

// Entry type: graduate or undergraduate
// TODO: ask if this should be called ACPE grad date
export enum EntryType {
    EA =  'EA',
    DE = 'DE'
}

// IPPE = Introductory Pharmacy Practice Experiences
// APPE = Advanced Pharmacy Practice Experiences
export enum PCFType {
    PORTFOLIO=  'PORTFOLIO',
    CLASSROOM = 'CLASSROOM',
    IPPE = 'IPPE',
    APPE = 'APPE'
}

// The committee that reviews someone's PCF
export enum PCFReviewer {
    PCF_ONLY= 'PCF_ONLY',
    APCB = 'APCB',
    ASC = 'ASC'
}

// users access level to data
export enum AccessLevel {
    READ = 'read',
    WRITE = 'write'
}
