import CourseController from '../controller/CourseController';
import Config from './Config';

const BASE_PATH = '/courses';

const CourseRoutes = [
    {
        method: Config.GET,
        route: BASE_PATH,
        controller: CourseController,
        action: 'filter',
    },
    {
        method: Config.GET,
        route: `${BASE_PATH}/:id`,
        controller: CourseController,
        action: 'findById',
    },
    {
        method: Config.POST,
        route: BASE_PATH,
        controller: CourseController,
        action: 'save',
    },
    {
        method: Config.PUT,
        route: `${BASE_PATH}/:id`,
        controller: CourseController,
        action: 'save',
    },
    {
        method: Config.PATCH,
        route: `${BASE_PATH}/:id`,
        controller: CourseController,
        action: 'update',
    },
    {

        method: Config.DELETE,
        route: `${BASE_PATH}/:id`,
        controller: CourseController,
        action: 'remove',
    },
];

export default CourseRoutes;
