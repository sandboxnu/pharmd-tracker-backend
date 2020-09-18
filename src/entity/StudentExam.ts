import {Entity, PrimaryColumn, ManyToOne, Column, Double} from "typeorm";
import { Student } from "./Student";
import { Exam } from "./Exam";

@Entity()
export class StudentExam {

    @PrimaryColumn()
    studentId: string;

    @PrimaryColumn()
    examId: string;

    @Column()
    term: string;

    @Column()
    percentage: Double;

    // TODO: should courseId be included?

    @Column()
    letterGrade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D'| 'D-' | 'F';

    @ManyToOne(type => Exam, student => student.studentExams)
    student: Student;

    @ManyToOne(type => Exam, course => course.studentExams)
    exam: Exam;

}