import {getRepository, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);


    // get users that match the given query params
    async parseQuery(queryObj) {
        try {
            let where = {};
            const paramList = Object.keys(queryObj);

            for (const param of paramList) {
                if (param in queryObj) {
                    let value = queryObj[param];

                    switch (param) {
                        case 'id':
                        case 'accessLevel':
                            where[param] = value;
                            break;
                        case 'firstName':
                        case 'lastName':
                            where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                            break;
                        default:
                            break;
                    }
                }
            }
            return where;
        } catch (e) {
            return e;
        }

    };

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const users = await this.userRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': users.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return users;
        } catch (e) {
            return e;
        }
    };

    // find a user by the given id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.userRepository.findOne({
                where: {id: request.params.id}
            });
        } catch(e) {
            return e;
        }
    }

    // Create or update a user
    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.userRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    // Delete an existing user
    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const userToRemove = await this.userRepository.findOne(request.params.id);
            await this.userRepository.remove(userToRemove);
            return userToRemove;
        } catch (e) {
            return e;
        }
    }
}
