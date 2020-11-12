import {Entity, PrimaryColumn, ManyToOne, Column, Double} from "typeorm";
import { Student } from "./Student";
import { Exam } from "./Exam";
import {IsInt, Length, Max, Min} from "class-validator";
import {LetterGrade, Semester} from "./Enums";

@Entity()
export class StudentExam {

    @PrimaryColumn({
        comment: "NUID"
    })
    @Length(9, 9)
    @IsInt()
    NUID: string;

    @PrimaryColumn()
    examId: string;

    @Column({
        type: "enum",
        enum: Semester,
        default: Semester.FALL
    })
    semester: Semester;

    @Column()
    @IsInt()
    @Length(4)
    year: number;

    @Column({type: "float"})
    @Min(0)
    @Max(100)
    percentage: number;

    // TODO: should courseId be included here or in Exam model?

    @Column({
        type: "enum",
        enum: LetterGrade,
        default: LetterGrade.A
    })
    letterGrade: LetterGrade;

    @ManyToOne(type => Exam, student => student.studentExams)
    student: Student;

    @ManyToOne(type => Exam, course => course.studentExams)
    exam: Exam;

}