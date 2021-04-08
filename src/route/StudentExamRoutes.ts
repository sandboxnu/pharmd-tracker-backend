import StudentExamController from '../controller/StudentExamController';
import Config from './Config';

const BASE_PATH = '/studentExams';

const StudentExamRoutes = [
    {
        method: Config.GET,
        route: BASE_PATH,
        controller: StudentExamController,
        action: 'filter',
    },
    {
        method: Config.GET,
        route: `${BASE_PATH}/:id`,
        controller: StudentExamController,
        action: 'findById',
    },
    {
        method: Config.POST,
        route: BASE_PATH,
        controller: StudentExamController,
        action: 'save',
    },
    {
        method: Config.PUT,
        route: `${BASE_PATH}/:id`,
        controller: StudentExamController,
        action: 'save',
    },
    {
        method: Config.PATCH,
        route: `${BASE_PATH}/:id`,
        controller: StudentExamController,
        action: 'update',
    },
    {
        method: Config.DELETE,
        route: `${BASE_PATH}/:id`,
        controller: StudentExamController,
        action: 'remove',
    },
];

export default StudentExamRoutes;
