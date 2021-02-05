import {Entity, ManyToOne, Column, Unique, PrimaryGeneratedColumn} from "typeorm";
import { Student } from "./Student";
import { Course } from "./Course";
import {IsInt, Length, Min, Max} from "class-validator";
import {Semester, LetterGrade} from "./Enums";

@Entity()
@Unique(["studentId", "courseId"])
export class StudentCourse {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    studentId: string;

    @Column()
    courseId: string;

    @Column({
        type: "enum",
        enum: Semester,
        default: Semester.FALL
    })
    semester: Semester;

    @Column()
    @IsInt()
    @Length(4)
    year: number;

    @Column({type: "float"})
    @Min(0)
    @Max(100)
    percentage: number;

    @Column({
        type: "enum",
        enum: LetterGrade,
        default: LetterGrade.A
    })
    letterGrade: LetterGrade;

    @ManyToOne(type => Student, student => student.studentCourses)
    student: Student;

    @ManyToOne(type => Course, course => course.studentCourses)
    course: Course;
}