import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Note } from "./Note";
import { StudentCourse } from "./StudentCourse";
import { StudentExam } from "./StudentExam";

export enum EntryType {
    DE = "DE",
    EA = "EA"
}
export enum StudentStatus {
    ENROLLED = "Enrolled",
    LEAVE = "On Leave",
    DROPBACK = "Drop Back",
    CO_OP = "Co-Op"
}

@Entity()
export class Student {

    // mandatory columns

    @PrimaryColumn({
        comment: "NUID"
    })
    id: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column({
        comment: "semester of entry"
    })
    entryDate: string;

    @Column({
        comment: "original semester of graduation (upon entry)"
    })
    originalGradDate: string;

    @Column({
        comment: "semester of graduation"
    })
    gradDate: string;

    @Column({
        type: "enum",
        enum: StudentStatus,
        default: StudentStatus.ENROLLED,
    })
    status: string;

    @Column("double")
    gpa: number;

    // non-mandatory columns

    @Column({
        nullable: true,
        default: ""
    })
    preferredName: string;

    @Column({
        type: "simple-array",
        nullable: true,
        default: []
    })
    gradDateChanges: string[];

    @Column({
        type: "enum",
        enum: EntryType,
        default: EntryType.DE
    })
    entryType: EntryType;

    @Column({
        default: false
    })
    hasVisa: boolean;

    @Column({
        default: false
    })
    isDualDegree: boolean;

    @Column({
        default: false
    })
    leftProgram: boolean;

    // relations

    @OneToMany(type => StudentCourse, studentCourse => studentCourse.student)
    studentCourses: StudentCourse[];

    @OneToMany(type => StudentExam, studentExam => studentExam.student)
    studentExams: StudentExam[];

    @OneToMany(type => Note, note => note.student)
    notes: Note[];

}