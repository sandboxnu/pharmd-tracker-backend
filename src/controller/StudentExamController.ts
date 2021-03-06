import {Between, Equal, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {StudentExam} from "../entity/StudentExam";

export class StudentExamController {

    private studentExamRepository = getRepository(StudentExam);

    // gets studentExams that match the given query params
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
                        case 'examId':
                        //TODO: Create number values for each letterGrade for comparisons
                        case 'letterGrade':
                        case 'semester':
                            where[param] = value;
                            break;
                        case 'year':
                        case 'percentage':
                            where[param] = Between(value[0], value[1]);
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
    };

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const studentExams = await this.studentExamRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': studentExams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return studentExams;
        } catch (e) {
            return e;
        }
    };

    // find a studentExam given its unique id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentExamRepository.findOne({
                where: {id: request.params.id}
            });
        } catch(e) {
            return e;
        }
    }

    // Create or update an exam
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentExamRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    // Delete an existing studentExam
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentExamToRemove = await this.studentExamRepository.findOne(request.params.id);
            await this.studentExamRepository.remove(studentExamToRemove);
            return studentExamToRemove;
        } catch (e) {
            return e;
        }
    }

}