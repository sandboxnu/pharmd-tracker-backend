import {Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import { Exam } from "./Exam";
import { StudentCourse } from "./StudentCourse";
import { IsInt, Length} from "class-validator";

@Entity()
@Unique(['subject', 'number'])
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