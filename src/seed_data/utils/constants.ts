import { EntryType, Semester, StudentStatus } from "../../entity/Enums";

export const subjects = ['PHMD', 'PHSC', 'AB', 'CD', 'BIOL', 'CHEM'];
export const semesters = [Semester.FALL, Semester.SPRING, Semester.SUMMER, Semester.SUMMER1, Semester.SUMMER2];
export const statuses = [StudentStatus.ENROLLED, StudentStatus.LEAVE, StudentStatus.DROP_BACK, StudentStatus.COOP, StudentStatus.GRADUATED];
export const entryTypes = [EntryType.EA, EntryType.DE];
export const startYears = [2018, 2017, 2016];
export const endYears = [2020, 2021, 2022];
export const years = [2021, 2020, 2019, 2018, 2017, 2016];
