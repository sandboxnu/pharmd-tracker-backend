import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Exam} from "../entity/Exam";

export class ExamController {

    private examRepository = getRepository(Exam);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.examRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next: NextFunction) {
        return this.examRepository.find({
            where: request.params.params,
        })
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        return this.examRepository.findOne(request.params.examId);
    }

    async findByName(request: Request, response: Response, next: NextFunction) {
        return this.examRepository.findOne({
            where: {name: request.params.examId}
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.examRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.examRepository.findOne(request.params.id);
        await this.examRepository.remove(userToRemove);
    }

}