import { getRepository, Like, Raw, LessThanOrEqual, MoreThanOrEqual, Between} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

// TODO: I did all these controllers kinda wrong cuz I'm stupid
// it should be like this:
// https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md#:~:text=Adding%20Express%20to%20the%20application,-Let's%20add%20Express&text=ts%20file%20and%20add%20express,)%3B%20%2F%2F%20register%20routes%20app.


export class CourseController {

    // Gets all the courses in the DB
    static async all(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const courses = await courseRepository.find();
            await res.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return res.send(courses);
        } catch(e) {
            return res.send(e);
        }
    }

    static async parseQuery(queryObj) {
        let where = {};
        // const queryParams = ['id', 'name', 'subject'];
        const paramList = Object.keys(queryObj);
        for (const param of paramList) {
            let value = queryObj[param];

            switch (param) {
                case 'id':
                    where[param] = Raw(alias => `LOWER(${alias}) LIKE '${value.toLowerCase()}%'`);
                    break;
                case 'name':
                case 'subject':
                    where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                    break;
                case 'number':
                    if ('max' in value && 'min' in value) {
                        where[param] = Between(value.min, value.max);
                    } else if ('max' in value) {
                        where[param] = LessThanOrEqual(value.max);
                    } else if ('min' in value) {
                        where[param] = MoreThanOrEqual(value.min);
                    } else {
                        where[param] = value;
                    }
                    break;
                default:
                    break;
            }
        }

        return where;
    }

    // TODO: parse query method
    static async filter(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const parsedParams = await CourseController.parseQuery(req.query);
            const courses = await courseRepository.find({
                where: parsedParams
            });
            await res.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return res.send(courses);
        } catch(e) {
            return res.send(e);
        }
    }

    // Gets the course the given id
    static async findById(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const course = await courseRepository.findOne({
                id: req.params.courseId
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Gets the course with the given name
    static async findByName(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const course = await courseRepository.findOne({
                name: req.params.courseName
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Creates a new course
    static async save(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const newCourse = await courseRepository.save(req.body);
            return res.send(newCourse);
        } catch (e) {
            return res.send(e);
        }
    }

    // Updates the course with the given id
    static async update(req: Request, res: Response, next?:NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            let courseToUpdate = await courseRepository.findOne({
                id: req.params.courseId
            });
            courseRepository.merge(courseToUpdate, req.body);
            await courseRepository.save(courseToUpdate);
            return res.send(courseToUpdate);
        } catch(e) {
            return res.send(e);
        }
    }

    // Deletes the course with the given id
    static async remove(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            let courseToRemove = await courseRepository.findOne({
                id: req.params.courseId
            });
            await courseRepository.remove(courseToRemove);
            return res.send(courseToRemove);
        } catch (e) {
            return res.send(e);
        }
    }

}