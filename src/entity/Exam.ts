import {
    Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course';
import { StudentExam } from './StudentExam';

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    name: string;

    // relations

    @OneToMany(() => StudentExam, (studentExam) => studentExam.student)
    studentExams: StudentExam[];

    @ManyToOne(() => Course, (course) => course.exams)
    course: Course;
}
