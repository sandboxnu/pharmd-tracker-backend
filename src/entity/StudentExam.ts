import {Entity, ManyToOne, Column, PrimaryGeneratedColumn, Unique} from "typeorm";
import { Student } from "./Student";
import { Exam } from "./Exam";
import {IsInt, Length, Max, Min} from "class-validator";
import {LetterGrade, Semester} from "./Enums";

@Entity()
@Unique(["studentId", "examId"])
export class StudentExam {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        comment: "NUID"
    })
    @Length(9, 9)
    @IsInt()
    studentId: string;

    @Column()
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

    @ManyToOne(type => Student, student => student.studentExams)
    student: Student;

    @ManyToOne(type => Exam, exam => exam.studentExams)
    exam: Exam;

}