import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Note} from "../entity/Note";

export class NoteController {

    private noteRepository = getRepository(Note);

    async all(request: Request, response: Response, next?: NextFunction) {
        try {
            const notes = await this.noteRepository.find();
            response.set({
                'X-Total-Count': notes.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return notes;
        } catch (e) {
            return e;
        }
    }

    // TODO: parse query method
    async filter(request: Request, response: Response, next?: NextFunction) {
        return this.noteRepository.find({
            where: request.params.params,
        })
    }

    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.noteRepository.findOne({
                where: {id: request.params.id}
            });
        } catch(e) {
            return e;
        }
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.noteRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const noteToRemove = await this.noteRepository.findOne(request.params.id);
            await this.noteRepository.remove(noteToRemove);
            return noteToRemove;
        } catch (e) {
            return e;
        }
    }

}