import {
    Entity, ManyToOne, Column, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {
    IsInt, Length, Max, Min,
} from 'class-validator';
import { Student } from './Student';
import { Exam } from './Exam';
import { LetterGrade, Semester } from './Enums';

@Entity()
@Unique(['student', 'exam'])
export class StudentExam {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({
        type: 'enum',
        enum: Semester,
        default: Semester.FALL,
    })
    semester: Semester;

    @Column()
    @IsInt()
    @Length(4)
    year: number;

    @Column({ type: 'float' })
    @Min(0)
    @Max(100)
    percentage: number;

    // TODO: should courseId be included here or in Exam model?

    @Column({
        type: 'enum',
        enum: LetterGrade,
        default: LetterGrade.A,
    })
    letterGrade: LetterGrade;

    @ManyToOne(() => Student, (student) => student.studentExams, { eager: true })
    student: Student;

    @ManyToOne(() => Exam, (exam) => exam.studentExams, { eager: true })
    exam: Exam;
}
