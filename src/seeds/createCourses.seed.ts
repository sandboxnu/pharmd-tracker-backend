import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Course } from '../entity/Course';
import { Exam } from '../entity/Exam';

export default class CreateCourses implements Seeder {

    // This deletes all data, regardless of foreign keys. Should never happen in production.
    async empty(connection: Connection) {

        console.log('Emptying Exam table ...');
        await connection.getRepository(Exam).delete({});

        console.log('Emptying Course table ...');
        await connection.getRepository(Course).delete({});
    }

    async run(factory: Factory, connection: Connection): Promise<void> {

        await this.empty(connection);

        console.log('\nCreating Courses and their Exams ...');
        await factory(Course)()
            .map(async (course: Course) => {

                // Create related exams
                const exams: Exam[] = await factory(Exam)().createMany(3)

                exams.forEach((exam) => {
                    exam.course = course;
                })

                // Attach entities and their properties to each other
                course.exams = exams;

                return course;
            })
            .createMany(36).then(() => console.log('Courses and Exams created!\n'));
    }
}
