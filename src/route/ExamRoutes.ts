import ExamController from '../controller/ExamController';
import Config from './Config';

const BASE_PATH = '/exams';

const ExamRoutes = [
  {
    method: Config.GET,
    route: BASE_PATH,
    controller: ExamController,
    action: 'filter',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id`,
    controller: ExamController,
    action: 'findById',
  },
  {
    method: Config.POST,
    route: BASE_PATH,
    controller: ExamController,
    action: 'save',
  },
  {
    method: Config.PUT,
    route: `${BASE_PATH}/:id`,
    controller: ExamController,
    action: 'save',
  },
  {
    method: Config.PATCH,
    route: `${BASE_PATH}/:id`,
    controller: ExamController,
    action: 'update',
  },
  {
    method: Config.DELETE,
    route: `${BASE_PATH}/:id`,
    controller: ExamController,
    action: 'remove',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id/instances`,
    controller: ExamController,
    action: 'getStudentExamsByExamId',
  },
];

export default ExamRoutes;
