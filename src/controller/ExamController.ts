import { getRepository, Raw } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Exam } from '../entity/Exam';
import { StudentExam } from '../entity/StudentExam';

class ExamController {
    private examRepository = getRepository(Exam);

    private studentExamRepository = getRepository(StudentExam);

    // gets assessments that match the given query params
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
                        where[param] = value;
                        break;
                    case 'name':
                        where[param] = Raw((alias) => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
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
            const exams = await this.examRepository.find({
                where: parsedParams,
            });
            await response.set({
                'X-Total-Count': exams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count'],
            });
            return exams;
        } catch (e) {
            return e;
        }
    }

    // find an exam by the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.examRepository.findOne({
                where: { id: request.params.id },
                relations: ['course'],
            });
        } catch (e) {
            return e;
        }
    }

    // find an exam by the given name
    async findByName(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.examRepository.findOne({
                where: { name: request.params.name },
            });
        } catch (e) {
            return e;
        }
    }

    async getStudentExamsByExamId(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentExams = await this.studentExamRepository.find({
                where: {
                    exam: request.params.id,
                },
            });

            await response.set({
                'X-Total-Count': studentExams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count'],
            });
            return studentExams;
        } catch (e) {
            return e;
        }
    }

    // Create or update an exam
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.examRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    async update(request: Request, response: Response, next?: NextFunction) {
        try {
            const exam = await this.examRepository.findOne({
                where: { id: request.params.id },
            });
            const updateBody = { ...exam, ...request.body };
            return await this.examRepository.save(updateBody);
        } catch (e) {
            return e;
        }
    }

    // Delete an existing exam
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const examToRemove = await this.examRepository.findOne(request.params.id);
            await this.examRepository.remove(examToRemove);
            return examToRemove;
        } catch (e) {
            return e;
        }
    }
}

export default ExamController;
