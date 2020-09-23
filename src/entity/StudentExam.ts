import {Entity, PrimaryColumn, ManyToOne, Column, Double} from "typeorm";
import { Student } from "./Student";
import { Exam } from "./Exam";
import {Max, Min} from "class-validator";
import {LetterGrade} from "./Enums";

@Entity()
export class StudentExam {

    @PrimaryColumn()
    studentId: string;

    @PrimaryColumn()
    examId: string;

    @Column()
    term: string;

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