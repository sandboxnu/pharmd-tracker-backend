import {
    Between, Equal, getRepository,
} from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentExam } from '../entity/StudentExam';

class StudentExamController {
    private studentExamRepository = getRepository(StudentExam);

    // gets studentExams that match the given query params
    // eslint-disable-next-line class-methods-use-this
    async parseQuery(queryObj) {
        try {
            const where = {};
            const paramList = Object.keys(queryObj);

            for (const param of paramList) {
                if (param in queryObj) {
                    const value = queryObj[param];

                    switch (param) {
                    case 'id':
                    case 'student':
                    case 'exam':
                        // TODO: Create number values for each letterGrade for comparisons
                        // eslint-disable-next-line no-fallthrough
                    case 'letterGrade':
                    case 'semester':
                        where[param] = value;
                        break;
                    case 'year':
                    case 'percentage':
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
            }
            return where;
        } catch (e) {
            return e;
        }
    }

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const studentExams = await this.studentExamRepository
                .createQueryBuilder('studentExam')
                .where(parsedParams)
                .leftJoinAndSelect("studentExam.student", "student")
                .leftJoinAndSelect("studentExam.exam", "exam")
                .leftJoinAndSelect("exam.course", "course")
                .getMany()
            ;
            await response.set({
                'X-Total-Count': studentExams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count'],
            });
            return studentExams;
        } catch (e) {
            return e;
        }
    }

    // find a studentExam given its unique id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentExamRepository
                .createQueryBuilder('studentExam')
                .where({id: request.params.id})
                .leftJoinAndSelect("studentExam.student", "student")
                .leftJoinAndSelect("studentExam.exam", "exam")
                .leftJoinAndSelect("exam.course", "course")
                .getOne()
            ;
        } catch (e) {
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

    async update(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentExam = await this.studentExamRepository.findOne({
                where: { id: request.params.id },
            });
            const updateBody = { ...studentExam, ...request.body };
            return await this.studentExamRepository.save(updateBody);
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

export default StudentExamController;
