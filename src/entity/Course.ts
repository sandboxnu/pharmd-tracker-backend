import { Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Exam } from "./Exam";
import { StudentCourse } from "./StudentCourse";
import { IsInt, Length } from "class-validator";

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

    @OneToMany(type => Exam, exam => exam.course, { eager: true })
    exams: Exam[];

    @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.student)
    studentCourses: StudentCourse[];
}
