import {
    Between, Brackets, getRepository, Raw, Equal,
} from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Course } from '../entity/Course';

class CourseController {
    private courseRepository = getRepository(Course);

    // eslint-disable-next-line class-methods-use-this
    async parseQuery(queryObj) {
        try {
            const where = {};
            const paramList = Object.keys(queryObj);
            for (const param of paramList) {
                const value = queryObj[param];

                switch (param) {
                case 'id':
                    where[param] = Equal(value);
                    break;
                case 'name':
                case 'subject':
                    where[param] = Raw((alias) => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                    break;
                case 'number':
                    if (Array.isArray(value)) {
                        value.sort();
                        where[param] = Between(value[0], value[1]);
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
            return e;
        }
    }

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const start: number = request.query._start ? request.query._start : 0;
            const end: number = request.query._end ? request.query._end : 0;
            const order = request.query._order ? request.query._order : 'ASC';
            const sort = request.query._sort ? request.query._sort : 'name';
            const maybeCourseNameOrSubjectQuery = CourseController
                .extractOnlyText(request.query.name_like);
            const maybeNumberQuery = CourseController.maybeExtractNumbers(request.query.name_like);

            const courses = await this.courseRepository
                .createQueryBuilder('course')
                .where(parsedParams)
                .andWhere(new Brackets((qb) => {
                    qb.where('course.name ILIKE :maybeCourseNameOrSubject',
                        { maybeCourseNameOrSubject: maybeCourseNameOrSubjectQuery })
                        .orWhere('course.subject ILIKE :maybeCourseNameOrSubject',
                            { maybeCourseNameOrSubject: maybeCourseNameOrSubjectQuery });
                }))
                .andWhere(`course.number ${maybeNumberQuery}`)
                .orderBy(sort, order)
                .limit(end - start)
                .skip(start)
                .getMany();

            await response.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count'],
            });
            return courses;
        } catch (e) {
            return e;
        }
    }

    // Gets the course the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.courseRepository.findOne({
                id: request.params.id,
            });
        } catch (e) {
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

    async update(request: Request, response: Response, next?: NextFunction) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: request.params.id },
            });
            const updateBody = { ...course, ...request.body };
            return await this.courseRepository.save(updateBody);
        } catch (e) {
            return e;
        }
    }

    // Deletes the course with the given id
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const courseToRemove = await this.courseRepository.findOne({
                id: request.params.id,
            });
            await this.courseRepository.remove(courseToRemove);
            return courseToRemove;
        } catch (e) {
            return e;
        }
    }

    private static extractOnlyText(text) {
        const queryText = text
            ? text.substring(1).replace(/[0-9]/g, '').trim()
            : '';
        // eslint-disable-next-line radix
        return text && !Number.isNaN(parseInt(text))
            ? ''
            : `%${queryText}%`;
    }

    private static maybeExtractNumbers(text) {
        const IS_NOT_NULL = 'IS NOT NULL';
        if (text) {
            const parsedNumbers = text.replace(/\D/g, '');
            // eslint-disable-next-line radix
            return !Number.isNaN(parseInt(parsedNumbers))
                ? `= ${parsedNumbers}`
                : IS_NOT_NULL;
        }

        return IS_NOT_NULL;
    }
}

export default CourseController;
