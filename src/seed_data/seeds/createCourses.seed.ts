import { Seeder, Factory } from 'typeorm-seeding';
import * as ora from 'ora';
import { Course } from '../../entity/Course';
import { Exam } from '../../entity/Exam';

export default class CreateCourses implements Seeder {
    // eslint-disable-next-line class-methods-use-this
    async run(factory: Factory): Promise<void> {
        const spinner = ora();
        spinner.start('\tCreating Courses and their Exams');

        await factory(Course)()
            .map(async (course: Course) => {
                // Create related exams
                const exams: Exam[] = await factory(Exam)().createMany(3);

                // Attach entities and their properties to each other
                // eslint-disable-next-line no-param-reassign
                course.exams = exams;

                return course;
            })
            .createMany(36).then(() => spinner.succeed('Courses and Exams have been created!'));
    }
}
