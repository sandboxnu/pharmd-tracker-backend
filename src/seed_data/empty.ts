import {
    Connection, createConnection, getConnection, getConnectionOptions,
} from 'typeorm';
import * as ora from 'ora';
import { StudentExam } from '../entity/StudentExam';
import { Course } from '../entity/Course';
import { Exam } from '../entity/Exam';
import { Note } from '../entity/Note';
import { Student } from '../entity/Student';
import { StudentCourse } from '../entity/StudentCourse';

const empty = async () => {
    const connectionOptions = await getConnectionOptions('dev');
    createConnection({ ...connectionOptions, name: 'default' }).then(async () => {
        const connection: Connection = getConnection('default');
        const spinner = ora();

        // This deletes all data, regardless of foreign keys. Should never happen in production.
        spinner.start('Emptying StudentExam table');
        await connection.getRepository(StudentExam).delete({}).then(() => spinner.succeed());

        spinner.start('Emptying Exam table');
        await connection.getRepository(Exam).delete({}).then(() => spinner.succeed());

        spinner.start('Emptying StudentCourse table');
        await connection.getRepository(StudentCourse).delete({}).then(() => spinner.succeed());

        spinner.start('Emptying Course table');
        await connection.getRepository(Course).delete({}).then(() => spinner.succeed());

        spinner.start('Emptying Note table');
        await connection.getRepository(Note).delete({}).then(() => spinner.succeed());

        spinner.start('Emptying Student table');
        await connection.getRepository(Student).delete({}).then(() => spinner.succeed());
    });
};

empty();
