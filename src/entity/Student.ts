import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Note } from "./Note";
import { StudentCourse } from "./StudentCourse";
import { StudentExam } from "./StudentExam";
import {IsInt, Length, Min, Max} from "class-validator";
import {EntryType, Semester, StudentStatus} from "./Enums";

@Entity()
export class Student {

    // mandatory columns

    @PrimaryColumn({
        comment: "NUID"
    })
    @Length(9, 9)
    @IsInt()
    id: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    // TODO: do we want enum so theres validation or just have a string
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
    status: StudentStatus;

    @Column({type: "float"})
    @Min(0)
    @Max(4)
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
    //TODO: Is this the right way to check length of array?
    @Length(3)
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