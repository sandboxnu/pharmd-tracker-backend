import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {StudentExam} from "../entity/StudentExam";

export class UserController {

    private studentExamRepository = getRepository(StudentExam);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.find({
            where: request.params.params,
        })
    }

    async findByStudentId(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.findOne({
            where: {
                studentId: request.params.studentId,
            }
        });
    }

    async findByExamId(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.findOne({
            where: {
                examId: request.params.examId,
            }
        });
    }

    async findByIds(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.findOne({
            where: {
                studentId: request.params.courseId,
                examId: request.params.examId,
            }
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.studentExamRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.studentExamRepository.findOne(request.params.id);
        await this.studentExamRepository.remove(userToRemove);
    }

}