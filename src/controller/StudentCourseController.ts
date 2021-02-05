import {Between, Equal, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {StudentCourse} from "../entity/StudentCourse";

export class StudentCourseController {

    private studentCourseRepository = getRepository(StudentCourse);


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
            return await this.studentCourseRepository.findOne({
                where: {id: request.params.id}
            });
        } catch(e) {
            return e;
        }
    }

    // Create or update a studentCourse
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentCourseRepository.save(request.body);
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