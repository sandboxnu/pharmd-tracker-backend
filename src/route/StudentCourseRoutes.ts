import StudentCourseController from '../controller/StudentCourseController';
import Config from './Config';

const BASE_PATH = '/studentCourses';

const StudentCourseRoutes = [
  {
    method: Config.GET,
    route: BASE_PATH,
    controller: StudentCourseController,
    action: 'filter',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id`,
    controller: StudentCourseController,
    action: 'findById',
  },
  {
    method: Config.POST,
    route: BASE_PATH,
    controller: StudentCourseController,
    action: 'save',
  },
  {
    method: Config.PUT,
    route: `${BASE_PATH}/:id`,
    controller: StudentCourseController,
    action: 'save',
  },
  {
    method: Config.PATCH,
    route: `${BASE_PATH}/:id`,
    controller: StudentCourseController,
    action: 'update',
  },
  {
    method: Config.DELETE,
    route: `${BASE_PATH}/:id`,
    controller: StudentCourseController,
    action: 'remove',
  },
];

export default StudentCourseRoutes;
