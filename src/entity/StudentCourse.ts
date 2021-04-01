import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {
  IsInt, Length, Max, Min,
} from 'class-validator';
import { Student } from './Student';
import { Course } from './Course';
import { LetterGrade, Semester } from './Enums';

@Entity()
@Unique(['student', 'course'])
export class StudentCourse {
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

    @Column({
      type: 'enum',
      enum: LetterGrade,
      default: LetterGrade.A,
    })
    letterGrade: LetterGrade;

    @ManyToOne(() => Student, (student) => student.studentCourses, { eager: true })
    student: Student;

    @ManyToOne(() => Course, (course) => course.studentCourses, { eager: true })
    course: Course;
}
