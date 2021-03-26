import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Course } from '../../entity/Course';
import { Note } from '../../entity/Note';
import { Student } from '../../entity/Student';
import { StudentCourse } from '../../entity/StudentCourse';
import { StudentExam } from '../../entity/StudentExam';

import * as ora from 'ora';

export default class CreateStudents implements Seeder {

    async run(factory: Factory, connection: Connection): Promise<void> {
        const spinner = ora();
        const courses: Course[] = await connection.getRepository(Course).find({});
        let courseCount = 0;

        spinner.start('\tCreating Students and their related entities');
        await factory(Student)()
            .map(async (student: Student) => {

                // Create related entities
                let notes: Note[] = await factory(Note)().createMany(3);
                let studentCourses: StudentCourse[] = [];
                let studentExams: StudentExam[] = [];

                let i: number;
                for (i = 0; i < 10; i++) {
                    let currentCourse = courses[courseCount % (courses.length - 1)];

                    let studentCourse = await factory(StudentCourse)().create({ course: currentCourse });

                    for (const exam of currentCourse.exams) {
                        const studentExam: StudentExam = await factory(StudentExam)().create({ year: studentCourse.year, exam: exam, semester: studentCourse.semester });
                        studentExams.push(studentExam);
                    }

                    courseCount++;
                    studentCourses.push(studentCourse);
                }

                // Attach entities
                student.studentExams = studentExams;
                student.notes = notes;
                student.studentCourses = studentCourses;

                return student;
            })
            .createMany(50).then((_) => spinner.succeed('Students, StudentExams, StudentCourses, and Notes have been created!'));
    }
}
