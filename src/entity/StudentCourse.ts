import {Entity, PrimaryColumn, ManyToOne, Column} from "typeorm";
import { Student } from "./Student";
import { Course } from "./Course";

@Entity()
export class StudentCourse {

    @PrimaryColumn()
    studentId: string;

    @PrimaryColumn()
    courseId: string;

    @Column()
    term: string;

    @Column()
    percentage: double;

    @Column()
    letterGrade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D'| 'D-' | 'F';

    @ManyToOne(type => Student, student => student.studentCourses)
    student: Student;

    @ManyToOne(type => Course, course => course.studentCourses)
    course: Course;

}