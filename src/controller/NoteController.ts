import { Between, Equal, getRepository, Like, Raw} from "typeorm";
import { NextFunction, Request, Response } from "express";
import { startOfDay, endOfDay } from 'date-fns';
import { Note } from "../entity/Note";

export class NoteController {

    private noteRepository = getRepository(Note);

    async parseQuery(queryObj) {
        try {
            let where = {};
            const paramList = Object.keys(queryObj);
            for (const param of paramList) {
                let value = queryObj[param];

                switch (param) {
                    case 'id':
                    case 'student':
                        where[param] = Equal(value);
                        break;
                    case 'title':
                    case 'body':
                        where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                        break;
                    case 'date':

                        if (Array.isArray(value)) {
                            const dateOne = new Date(value[0]);
                            const dateTwo = new Date(value[1]);

                            const first = (dateOne < dateTwo) ? startOfDay(dateOne) : startOfDay(dateTwo);
                            const second = (dateOne < dateTwo) ? startOfDay(dateTwo) : startOfDay(dateOne);

                            where[param] = Between(first, second);
                        } else {
                            where[param] = value;
                        }
                        break;
                    case 'tags':
                        where[param] = Like(`%${value}%`);
                        break;
                    default:
                        break;
                }
            }
            return where;
        } catch (e) {
            return e
        }
    }

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const notes = await this.noteRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': notes.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return notes;
        } catch (e) {
            return e;
        }
    }

    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.noteRepository.findOne({
                where: { id: request.params.id }
            });
        } catch (e) {
            return e;
        }
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.noteRepository.save({
                ...request.body,
                date: new Date(Date.now())
            });
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