import UserController from '../controller/UserController';
import Config from './Config';

const BASE_PATH = '/users';

const UserRoutes = [
    {
        method: Config.GET,
        route: BASE_PATH,
        controller: UserController,
        action: 'filter',
    },
    {
        method: Config.GET,
        route: `${BASE_PATH}/:id`,
        controller: UserController,
        action: 'findById',
    },
    {
        method: Config.POST,
        route: BASE_PATH,
        controller: UserController,
        action: 'save',
    },
    {
        method: Config.PUT,
        route: `${BASE_PATH}/:id`,
        controller: UserController,
        action: 'save',
    },
    {
        method: Config.PATCH,
        route: `${BASE_PATH}/:id`,
        controller: UserController,
        action: 'update',
    },
    {
        method: Config.DELETE,
        route: `${BASE_PATH}/:id`,
        controller: UserController,
        action: 'remove',
    },
];

export default UserRoutes;
