import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Course } from '../entity/Course';
import { Note } from '../entity/Note';
import { Student } from '../entity/Student';
import { StudentCourse } from '../entity/StudentCourse';
import { StudentExam } from '../entity/StudentExam';

export default class CreateStudents implements Seeder {

    // This deletes all data, regardless of foreign keys. Should never happen in production.
    async empty(connection: Connection) {
        console.log('Emptying Note table ...');
        await connection.getRepository(Note).delete({});

        console.log('Emptying StudentCourse Table ...');
        await connection.getRepository(StudentCourse).delete({});

        console.log('Emptying StudentExam table ...');
        await connection.getRepository(StudentExam).delete({});

        console.log('Emptying Student table ...');
        await connection.getRepository(Student).delete({});

    }

    async run(factory: Factory, connection: Connection): Promise<void> {
        this.empty(connection);

        const courses: Course[] = await connection.getRepository(Course).find({});
        let courseCount = 0;

        console.log('\nCreating Students and their related entities ...');
        await factory(Student)()
            .map(async (student: Student) => {
                // Create related entities
                const notes: Note[] = await factory(Note)().createMany(3);
                const studentCourses: StudentCourse[] = await factory(StudentCourse)().createMany(10);
                const studentExams: StudentExam[] = [];

                // Attach entities
                student.notes = notes;
                student.studentCourses = studentCourses;
                notes.forEach((note) => note.student = student);
                studentCourses.forEach((studentCourse) => {
                    let currentCourse = courses[courseCount % 35];

                    studentCourse.student = student;
                    studentCourse.course = currentCourse;
                    if (currentCourse.studentCourses == null) {
                        currentCourse.studentCourses = [studentCourse];
                    } else {
                        currentCourse.studentCourses.push(studentCourse);
                    }

                    currentCourse.exams.forEach(async (exam) => {
                        const studentExam: StudentExam = await factory(StudentExam)().create({ year: studentCourse.year });

                        studentExam.exam = exam;
                        studentExam.student = student;
                        studentExam.semester = studentCourse.semester;

                        if (exam.studentExams == null) {
                            exam.studentExams = [studentExam];
                        } else {
                            exam.studentExams.push(studentExam);
                        }

                        studentExams.push(studentExam);
                    })

                    courseCount++;
                })

                student.studentExams = studentExams;
                student.notes = notes;
                student.studentCourses = studentCourses;

                return student;
            })
            .createMany(50).then((_) => console.log('\nStudents, StudentExams, StudentCourses, and Notes have been created!'));
    }
}
