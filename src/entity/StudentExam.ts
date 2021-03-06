import {Entity, ManyToOne, Column, PrimaryGeneratedColumn, Unique} from "typeorm";
import { Student } from "./Student";
import { Exam } from "./Exam";
import {IsInt, Length, Max, Min} from "class-validator";
import {LetterGrade, Semester} from "./Enums";

@Entity()
@Unique(["student", "exam"])
export class StudentExam {

    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToOne(type => Student, student => student.studentExams, {eager:true})
    student: Student;

    @ManyToOne(type => Exam, exam => exam.studentExams, {eager:true})
    exam: Exam;

}