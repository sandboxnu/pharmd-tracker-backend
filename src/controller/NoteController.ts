import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Note} from "../entity/Note";

export class NoteController {

    private noteRepository = getRepository(Note);

    async all(request: Request, response: Response, next?: NextFunction) {
        return this.noteRepository.find();
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next?: NextFunction) {
        return this.noteRepository.find({
            where: request.params.params,
        })
    }

    async findById(request: Request, response: Response, next?: NextFunction) {
        return this.noteRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        return this.noteRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next?: NextFunction) {
        let userToRemove = await this.noteRepository.findOne(request.params.id);
        await this.noteRepository.remove(userToRemove);
    }

}