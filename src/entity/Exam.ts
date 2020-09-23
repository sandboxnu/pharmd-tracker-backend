import {Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Course } from "./Course";
import {StudentExam} from "./StudentExam";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    // relations

    @OneToMany(type => StudentExam, studentExam => studentExam.student)
    studentExams: StudentExam[];

    @ManyToOne(type => Course, course => course.exams)
    course: Course;
}