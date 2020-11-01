import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

// TODO: I did all these controllers kinda wrong cuz I'm stupid
// it should be like this:
// https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md#:~:text=Adding%20Express%20to%20the%20application,-Let's%20add%20Express&text=ts%20file%20and%20add%20express,)%3B%20%2F%2F%20register%20routes%20app.


export class CourseController {

    static async all(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.find();
    }

    // TODO: parse query method
    static async filter(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.find({
            where: request.params.params,
            })
    }

    static async findById(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.findOne({
            where: [
                {id: request.params.courseId}
            ],
        });
    }

    static async findByName(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.findOne({
            where: [
                {name: request.params.courseName}
            ]
        });
    }

    static async save(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.save(request.body);
    }

    static async remove(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        let userToRemove = await courseRepository.findOne({
            where: [
                {id: request.params.courseId}
                ],
        });
        await courseRepository.remove(userToRemove);
    }

}