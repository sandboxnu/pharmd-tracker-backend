import {Between, Equal, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

export class CourseController {

    private courseRepository = getRepository(Course);

    async parseQuery(queryObj) {
        try {
            let where = {};
            const paramList = Object.keys(queryObj);
            for (const param of paramList) {
                let value = queryObj[param];

                switch (param) {
                    case 'id':
                        where[param] = Equal(value);
                        break;
                    case 'name':
                    case 'subject':
                        where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                        break;
                    case 'number':
                        const hasMin = value.hasOwnProperty('min');
                        const hasMax = value.hasOwnProperty('max');
                        if ( hasMin && hasMax ) {
                            where[param] = Between(value.min, value.max);
                        } else if (hasMax) {
                            where[param] = LessThanOrEqual(value.max);
                        } else if (hasMin) {
                            where[param] = MoreThanOrEqual(value.min);
                        } else {
                            where[param] = Equal(value);
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
            let start: number = request.query["_start"] ? request.query["_start"] : 0;
            let end: number = request.query["_end"] ? request.query["_end"] : 0;
            const order = request.query["_order"] ? request.query["_order"] : "ASC";
            const sort = request.query["_sort"] ? request.query["_sort"] : "name";
            const courses = await this.courseRepository
                .createQueryBuilder("course")
                .where(parsedParams)
                .orderBy(sort, order)
                .limit(end - start)
                .skip(start)
                .getMany();
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
                id: request.params.id
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

    // Deletes the course with the given id
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            let courseToRemove = await this.courseRepository.findOne({
                id: request.params.id
            });
            await this.courseRepository.remove(courseToRemove);
            return courseToRemove;
        } catch (e) {
            return e;
        }
    }
}