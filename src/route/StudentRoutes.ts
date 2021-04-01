import StudentController from '../controller/StudentController';
import Config from './Config';

const BASE_PATH = '/students';

const StudentRoutes = [
  {
    method: Config.GET,
    route: BASE_PATH,
    controller: StudentController,
    action: 'filter',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id`,
    controller: StudentController,
    action: 'findById',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:studentId/courses/:courseId/exam-instances`,
    controller: StudentController,
    action: 'getStudentExamByCourse',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:studentId/courses/:courseId`,
    controller: StudentController,
    action: 'getStudentCourseByIds',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id/courses`,
    controller: StudentController,
    action: 'getCoursesByStudentId',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:studentId/exams/:examId`,
    controller: StudentController,
    action: 'getStudentExamByIds',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id/exams`,
    controller: StudentController,
    action: 'getExamsByStudentId',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id/notes`,
    controller: StudentController,
    action: 'getNotesByStudentId',
  },
  {
    method: Config.POST,
    route: BASE_PATH,
    controller: StudentController,
    action: 'save',
  },
  {
    method: Config.PUT,
    route: `${BASE_PATH}/:id`,
    controller: StudentController,
    action: 'save',
  },
  {
    method: Config.PATCH,
    route: `${BASE_PATH}/:id`,
    controller: StudentController,
    action: 'update',
  },
  {
    method: Config.DELETE,
    route: `${BASE_PATH}/:id`,
    controller: StudentController,
    action: 'remove',
  },
];

export default StudentRoutes;
