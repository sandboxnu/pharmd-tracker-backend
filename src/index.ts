import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from './route/index';

createConnection().then(async () => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use('/', routes);

    app.listen(3000, () => {
        console.log("Server started on port 3000! http://localhost:3000/");
    });

}).catch(error => console.log(error));
