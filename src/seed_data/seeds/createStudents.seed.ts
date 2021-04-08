import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import * as ora from 'ora';
import { Course } from '../../entity/Course';
import { Note } from '../../entity/Note';
import { Student } from '../../entity/Student';
import { StudentCourse } from '../../entity/StudentCourse';
import { StudentExam } from '../../entity/StudentExam';

export default class CreateStudents implements Seeder {
    // eslint-disable-next-line class-methods-use-this
    async run(factory: Factory, connection: Connection): Promise<void> {
        const spinner = ora();
        const courses: Course[] = await connection.getRepository(Course).find({}) as Course[];
        let courseCount = 0;

        spinner.start('\tCreating Students and their related entities');
        await factory(Student)()
            .map(async (student: Student) => {
                // Create related entities
                const notes: Note[] = await factory(Note)().createMany(3);
                const studentCourses: StudentCourse[] = [];
                const studentExams: StudentExam[] = [];

                let i: number;
                for (i = 0; i < 10; i += 1) {
                    const currentCourse = courses[courseCount % (courses.length - 1)];

                    // eslint-disable-next-line no-await-in-loop
                    const studentCourse = await factory(StudentCourse)().create({ course: currentCourse });

                    for (const exam of currentCourse.exams) {
                        // eslint-disable-next-line no-await-in-loop
                        const studentExam: StudentExam = await factory(StudentExam)().create(
                            { year: studentCourse.year, exam, semester: studentCourse.semester },
                        );
                        studentExams.push(studentExam);
                    }

                    courseCount += 1;
                    studentCourses.push(studentCourse);
                }

                // Attach entities
                /* eslint-disable no-param-reassign */
                student.studentExams = studentExams;
                student.notes = notes;
                student.studentCourses = studentCourses;
                /* eslint-enable no-param-reassign */

                return student;
            })
            .createMany(50)
            .then(() => spinner.succeed('Students, StudentExams, StudentCourses, and Notes have been created!'));
    }
}
