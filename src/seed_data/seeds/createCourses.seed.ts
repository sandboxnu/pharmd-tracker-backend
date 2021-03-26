import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Course } from '../../entity/Course';
import { Exam } from '../../entity/Exam';

import * as ora from 'ora';

export default class CreateCourses implements Seeder {
    async run(factory: Factory, connection: Connection): Promise<void> {
        const spinner = ora();
        spinner.start('\tCreating Courses and their Exams');
        
        await factory(Course)()
            .map(async (course: Course) => {

                // Create related exams
                const exams: Exam[] = await factory(Exam)().createMany(3)

                // Attach entities and their properties to each other
                course.exams = exams;

                return course;
            })
            .createMany(36).then(() => spinner.succeed('Courses and Exams have been created!'));
    }
}
