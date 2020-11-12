import {CourseRoutes} from './CourseRoutes';
import {ExamRoutes} from './ExamRoutes';
import {UserRoutes} from './UserRoutes';

export const Routes = [
    ...CourseRoutes,
    ...ExamRoutes,
    ...UserRoutes,
];
