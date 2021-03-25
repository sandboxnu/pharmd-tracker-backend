import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Course } from '../entity/Course';
import { Exam } from '../entity/Exam';

export default class CreateCourses implements Seeder {

    // This deletes all data, regardless of foreign keys. Should never happen in production.


    async run(factory: Factory, connection: Connection): Promise<void> {
        console.log('\nCreating Courses and their Exams ...');
        await factory(Course)()
            .map(async (course: Course) => {

                // Create related exams
                const exams: Exam[] = await factory(Exam)().createMany(3)

                // Attach entities and their properties to each other
                course.exams = exams;

                return course;
            })
            .createMany(36).then(() => console.log('Courses and Exams created!\n'));
    }
}
