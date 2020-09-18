import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Exam } from "./Exam";
import { Student } from "./Student";
import { StudentCourse } from "./StudentCourse";
import {Note} from "./Note";

@Entity()
export class Course {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    semester: string;

    // relations

    @OneToMany(type => Exam, exam => exam.course)
    exams: Exam[];

    @OneToMany(type => StudentCourse, studentCourse => studentCourse.student)
    studentCourses: StudentCourse[];
}