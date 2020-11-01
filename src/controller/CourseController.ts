import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Course} from "../entity/Course";

// TODO: I did all these controllers kinda wrong cuz I'm stupid
// it should be like this:
// https://github.com/typeorm/typeorm/blob/master/docs/example-with-express.md#:~:text=Adding%20Express%20to%20the%20application,-Let's%20add%20Express&text=ts%20file%20and%20add%20express,)%3B%20%2F%2F%20register%20routes%20app.


export class CourseController {

    // Gets all the courses in the DB
    static async all(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const courses = await courseRepository.find();
            await res.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return res.send(courses);
        } catch(e) {
            return res.send(e);
        }
    }

    // TODO: parse query method
    static async filter(request: Request, response: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        return courseRepository.find({
            where: request.params.params,
            })
    }

    // Gets the course the given id
    static async findById(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const course = await courseRepository.findOne({
                where: [
                    {id: req.params.courseId}
                ],
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Gets the course with the given name
    static async findByName(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const course = await courseRepository.findOne({
                where: [
                    {name: req.params.courseName}
                ]
            });
            return res.send(course);
        } catch(e) {
            return res.send(e);
        }
    }

    // Creates a new course
    static async save(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            const newCourse = await courseRepository.save(req.body);
            return res.send(newCourse);
        } catch (e) {
            return res.send(e);
        }
    }

    // Updates the course with the given id
    static async update(req: Request, res: Response, next?:NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            let courseToUpdate = await courseRepository.findOne({
                where: [
                    {id: req.params.courseId}
                ],
            });
            courseRepository.merge(courseToUpdate, req.body);
            await courseRepository.save(courseToUpdate);
            return res.send(courseToUpdate);
        } catch(e) {
            return res.send(e);
        }
    }

    // Deletes the course with the given id
    static async remove(req: Request, res: Response, next?: NextFunction) {
        const courseRepository = getRepository(Course);
        try {
            let courseToRemove = await courseRepository.findOne({
                where: [
                    {id: req.params.courseId}
                ],
            });
            await courseRepository.remove(courseToRemove);
            return res.send(courseToRemove);
        } catch (e) {
            return res.send(e);
        }
    }

}