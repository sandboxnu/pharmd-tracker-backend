import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Student} from "../entity/Student";
import { Router } from 'express';

const router = Router();

const studentRepository = getRepository(Student);

router.get('/', async function(req: Request, res: Response) {
    try {
        const students = await studentRepository.find();
        res.set({
            'X-Total-Count': students.length,
            'Access-Control-Expose-Headers': ['X-Total-Count']
        });
    } catch(error) {
        return res.send(error);
    }
});

// TODO: how to keep these methods separate from the router -> want to call methods
//  rather than directly using find()
export class StudentController {

    private studentRepository = getRepository(Student);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find({
            where: request.params.params,
        })
    }

    // by first and last name
    async findAllByName(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find({
            where: {
                firstName: request.params.firstName,
                lastName: request.params.lastname
            }})
    }

    // by cohort
    async getCohort(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find({
            where: {
                adjustedGradDate: request.params.cohort,
            }})
    }

    // international students
    async getInternationalStudents(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find({
            where: {
                visa: 'F1',
            }})
    }

    // by id
    async findById(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.findOne(request.params.studentId);
    }

    async findByName(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.findOne({
            where: {
                firstName: request.params.firstName,
                lastName: request.params.lastname
            }})
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.studentRepository.findOne(request.params.id);
        await this.studentRepository.remove(userToRemove);
    }

}