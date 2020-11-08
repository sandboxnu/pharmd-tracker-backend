import {getRepository, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Exam} from "../entity/Exam";
import {StudentExam} from "../entity/StudentExam";


export class ExamController {

    private examRepository = getRepository(Exam);
    private studentExamRepository = getRepository(StudentExam);

    // find all exams
    async all(request: Request, response: Response, next?: NextFunction) {
        try {
            const exams = await this.examRepository.find();
            await response.set({
                'X-Total-Count': exams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return exams;
        } catch(e) {
            return response.send(e);
        }
    }

    // gets assessments that match the given query params
    async parseQuery(queryObj) {
        let where = {};
        const paramList = Object.keys(queryObj);

        for (const param of paramList) {
            if (param in queryObj) {
                let value = queryObj[param];

                switch (param) {
                    case 'id':
                        where[param] = value;
                        break;
                    case 'name':
                        where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                        break;
                    default:
                        break;
                }
            }
        }
        return where;
    };

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const exams = await this.examRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': exams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return exams;
        } catch (e) {
            return response.send(e);
        }
    };

    // find an exam by the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            const exam = await this.examRepository.findOne({
                where: {id: request.params.id}
            });
            return exam;
        } catch(e) {
            return response.send(e);
        }
    }

    // find an exam by the given name
    async findByName(request: Request, response: Response, next?: NextFunction) {
        try {
            const exam = await this.examRepository.findOne({
                where: {name: request.params.name}
            });
            return exam;
        } catch(e) {
            return response.send(e);
        }
    }

    async getStudentsByExam(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentExams = await this.studentExamRepository.find({
                where: {
                    examId: request.params.id,
                }
            });

            await response.set({
                'X-Total-Count': studentExams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return studentExams;
        } catch(e) {
            return response.send(e);
        }
    }

    // Create or update an exam
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            const newExam = await this.examRepository.save(request.body);
            return newExam;
        } catch (e) {
            return response.send(e);
        }
    }

    // Delete an existing exam
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const examToRemove = await this.examRepository.findOne(request.params.id);
            await this.examRepository.remove(examToRemove);
            return examToRemove;
        } catch (e) {
            return response.send(e);
        }
    }
}