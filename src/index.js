import express from 'express';
import cors from 'cors';
import routes from './controllers';
import models, { sequelize } from './models';

const app = express();

app.use(async (req, res, next) => {
    req.context = {
        models: models,
        me: await models.Student.findByNUID('cmyers'),
    };
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// APP ROUTES
app.use('/sessions', routes.sessionsRoutes);
app.use('/students', routes.studentRoutes);
app.use('/assessments', routes.assessmentsRoutes);
app.use('/courses', routes.courseRoutes);

// set this to true to wipe the whole database on load
const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    app.listen(process.env.DB_PORT, () => {
        console.log(`Example app listening on port ${process.env.DB_PORT}!`)
    });
}).catch(e => console.log(e));

app.listen(process.env.BACKEND_PORT, () =>
    console.log('Example app listening on port ' + process.env.BACKEND_PORT),
);


// https://github.com/makinhs/rest-api-tutorial
