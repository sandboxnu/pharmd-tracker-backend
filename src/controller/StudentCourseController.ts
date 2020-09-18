import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {StudentCourse} from "../entity/StudentCourse";

export class UserController {

    private studentCourseRepository = getRepository(StudentCourse);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.find({
            where: request.params.params,
        })
    }

    async findByStudentId(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.findOne({
            where: {
                studentId: request.params.studentId,
            }
        });
    }

    async findByCourseId(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.findOne({
            where: {
                courseId: request.params.courseId,
            }
        });
    }

    async findByIds(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.findOne({
            where: {
                studentId: request.params.courseId,
                courseId: request.params.courseId,
            }
        });
    }

    async findByTerm(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.findOne({
            where: {
                term: request.params.term,
            }
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.studentCourseRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.studentCourseRepository.findOne(request.params.id);
        await this.studentCourseRepository.remove(userToRemove);
    }

}