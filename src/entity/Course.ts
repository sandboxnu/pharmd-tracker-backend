import {
  Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { IsInt, Length } from 'class-validator';
import { Exam } from './Exam';
import { StudentCourse } from './StudentCourse';

@Entity()
@Unique(['subject', 'number'])
export class Course {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    @Length(2, 4)
    subject: string;

    @Column()
    @IsInt()
    @Length(4)
    number: number;

    @Column()
    name: string;

    // relations

    @OneToMany(() => Exam, (exam) => exam.course)
    exams: Exam[];

    @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.student)
    studentCourses: StudentCourse[];
}
