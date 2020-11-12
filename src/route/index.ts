import {CourseRoutes} from './CourseRoutes';
import {ExamRoutes} from './ExamRoutes';
import {NoteRoutes} from './NoteRoutes';
import {UserRoutes} from './UserRoutes';

export const Routes = [
    ...CourseRoutes,
    ...ExamRoutes,
    ...NoteRoutes,
    ...UserRoutes,
];
