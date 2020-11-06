import { getRepository, Raw, LessThanOrEqual, MoreThanOrEqual, Between} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

export class CourseController {

    private courseRepository = getRepository(Course);

    // Gets all the courses in the DB
    async all(req: Request, res: Response, next?: NextFunction) {
        try {
            const courses = await this.courseRepository.find();
            await res.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return res.send(courses);
        } catch(e) {
            return res.send(e);
        }
    }

    async parseQuery(queryObj) {
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

    async filter(req: Request, res: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(req.query);
            const courses = await this.courseRepository.find({
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
    async findById(req: Request, res: Response, next?: NextFunction) {
        try {
            const course = await this.courseRepository.findOne({
                id: req.params.courseId
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Gets the course with the given name
    async findByName(req: Request, res: Response, next?: NextFunction) {
        try {
            const course = await this.courseRepository.findOne({
                name: req.params.courseName
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Creates a new course
    async save(req: Request, res: Response, next?: NextFunction) {
        try {
            const newCourse = await this.courseRepository.save(req.body);
            return res.send(newCourse);
        } catch (e) {
            return res.send(e);
        }
    }

    // Updates the course with the given id
    async update(req: Request, res: Response, next?:NextFunction) {
        try {
            let courseToUpdate = await this.courseRepository.findOne({
                id: req.params.courseId
            });
            this.courseRepository.merge(courseToUpdate, req.body);
            await this.courseRepository.save(courseToUpdate);
            return res.send(courseToUpdate);
        } catch(e) {
            return res.send(e);
        }
    }

    // Deletes the course with the given id
    async remove(req: Request, res: Response, next?: NextFunction) {
        try {
            let courseToRemove = await this.courseRepository.findOne({
                id: req.params.courseId
            });
            await this.courseRepository.remove(courseToRemove);
            return res.send(courseToRemove);
        } catch (e) {
            return res.send(e);
        }
    }

}