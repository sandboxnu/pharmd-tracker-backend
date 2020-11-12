import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Exam } from "./Exam";
import { StudentCourse } from "./StudentCourse";
import {IsIn, IsInt, Length} from "class-validator";

@Entity()
export class Course {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2,4)
    subject: string;

    @Column()
    @IsInt()
    @Length(4)
    number: number;

    @Column()
    name: string;

    // relations

    @OneToMany(type => Exam, exam => exam.course)
    exams: Exam[];

    @OneToMany(type => StudentCourse, studentCourse => studentCourse.student)
    studentCourses: StudentCourse[];
}