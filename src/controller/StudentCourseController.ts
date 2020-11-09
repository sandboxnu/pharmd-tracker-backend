import {Between, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {StudentCourse} from "../entity/StudentCourse";

export class StudentCourseController {

    private studentCourseRepository = getRepository(StudentCourse);

    // find all studentCourses
    async all(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentCourses = await this.studentCourseRepository.find();
            await response.set({
                'X-Total-Count': studentCourses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return studentCourses;
        } catch(e) {
            return e;
        }
    }

    // gets studentCourses that match the given query params
    async parseQuery(queryObj) {
        try {
            let where = {};
            const paramList = Object.keys(queryObj);

            for (const param of paramList) {
                if (param in queryObj) {
                    let value = queryObj[param];

                    switch (param) {
                        case 'id':
                        case 'studentId':
                        case 'courseId':
                        //TODO: Create number values for each letterGrade for comparisons
                        case 'letterGrade':
                        case 'semester':
                            where[param] = value;
                            break;
                        case 'year':
                        case 'percentage':
                            if ('max' in value && 'min' in value) {
                                where[param] = Between(value.min, value.max);
                            } else if ('max' in value) {
                                where[param] = LessThanOrEqual(value.max);
                            } else if ('min' in value) {
                                where[param] = MoreThanOrEqual(value.min);
                            } else if ('exact') {
                                where[param] = value.exact;
                            }
                            break;
                        default:
                            break;
                    }
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
            const studentCourses = await this.studentCourseRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': studentCourses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return studentCourses;
        } catch (e) {
            return e;
        }
    };

    // find a studentCourse by the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentCourse = await this.studentCourseRepository.findOne({
                where: {id: request.params.id}
            });
            return studentCourse;
        } catch(e) {
            return e;
        }
    }

    // Create or update a studentCourse
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            const newStudentCourse = await this.studentCourseRepository.save(request.body);
            return newStudentCourse;
        } catch (e) {
            return e;
        }
    }

    // Delete an existing studentCourse
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentCourseToRemove = await this.studentCourseRepository.findOne(request.params.id);
            await this.studentCourseRepository.remove(studentCourseToRemove);
            return studentCourseToRemove;
        } catch (e) {
            return e;
        }
    }
}