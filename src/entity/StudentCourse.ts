import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Student} from "./Student";
import {Course} from "./Course";
import {IsInt, Length, Max, Min} from "class-validator";
import {LetterGrade, Semester} from "./Enums";

@Entity()
@Unique(["student", "course"])
export class StudentCourse {

    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToOne(type => Student, student => student.studentCourses, {eager: true})
    student: Student;

    @ManyToOne(type => Course, course => course.studentCourses, {eager: true})
    course: Course;
}