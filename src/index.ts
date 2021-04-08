import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import Routes from './route';

const createTypeormCon = async () => {
    const connectionOptions = await getConnectionOptions('dev');
    await createConnection({ ...connectionOptions, name: 'default' }).then(async () => {
    // create express app
        const app = express();
        app.use(bodyParser.json());

        // register express routes from defined application routes
        Routes.forEach((route) => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any)())[route.action](req, res, next);
                if (result instanceof Promise) {
                    // eslint-disable-next-line no-shadow
                    result.then((result) => (result !== null && result !== undefined
                        ? res.send(result)
                        : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        app.listen(3000, () => {
            console.log('Server started on port 3000! http://localhost:3000/');
        });
    }).catch((error) => console.log(error));
};

createTypeormCon().then(() => console.log('created connection to dev database'));
