import {Between, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

export class CourseController {

    private courseRepository = getRepository(Course);

    // Gets all the courses in the DB
    async all(request: Request, response: Response, next?: NextFunction) {
        try {
            const courses = await this.courseRepository.find();
            await response.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return courses;
        } catch(e) {
            return e
        }
    }

    async parseQuery(queryObj) {
        try {
            let where = {};
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
        } catch (e) {
            return e
        }
    }

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const courses = await this.courseRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return courses;
        } catch(e) {
            return e;
        }
    }

    // Gets the course the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.courseRepository.findOne({
                id: request.params.courseId
            });
        } catch(e) {
            return e;
        }
    }

    // Gets the course with the given name
    async findByName(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.courseRepository.findOne({
                name: request.params.courseName
            });
        } catch(e) {
            return e;
        }
    }

    // Creates a new course
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.courseRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    // Updates the course with the given id
    async update(request: Request, response: Response, next?:NextFunction) {
        try {
            let courseToUpdate = await this.courseRepository.findOne({
                id: request.params.courseId
            });
            this.courseRepository.merge(courseToUpdate, request.body);
            await this.courseRepository.save(courseToUpdate);
            return courseToUpdate;
        } catch(e) {
            return e;
        }
    }

    // Deletes the course with the given id
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            let courseToRemove = await this.courseRepository.findOne({
                id: request.params.courseId
            });
            await this.courseRepository.remove(courseToRemove);
            return courseToRemove;
        } catch (e) {
            return e;
        }
    }

}