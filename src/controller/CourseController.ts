import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

// TODO: I did all these controllers kinda wrong cuz I'm stupid
// it should be like this:
// https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md#:~:text=Adding%20Express%20to%20the%20application,-Let's%20add%20Express&text=ts%20file%20and%20add%20express,)%3B%20%2F%2F%20register%20routes%20app.


export class CourseController {

    private courseRepository = getRepository(Course);

    async all(request: Request, response: Response, next?: NextFunction) {
        return this.courseRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next?: NextFunction) {
        return this.courseRepository.find({
            where: request.params.params,
            })
    }

    async findById(request: Request, response: Response, next?: NextFunction) {
        return this.courseRepository.findOne(request.params.courseId);
    }

    async findByName(request: Request, response: Response, next?: NextFunction) {
        return this.courseRepository.findOne(request.params.courseName);
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        return this.courseRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next?: NextFunction) {
        let userToRemove = await this.courseRepository.findOne(request.params.id);
        await this.courseRepository.remove(userToRemove);
    }

}