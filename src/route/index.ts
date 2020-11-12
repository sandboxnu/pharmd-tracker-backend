import {CourseRoutes} from './CourseRoutes';
import {ExamRoutes} from './ExamRoutes';
import {NotesRoutes} from './NotesRoutes';
import {UserRoutes} from './UserRoutes';

export const Routes = [
    ...CourseRoutes,
    ...ExamRoutes,
    ...NotesRoutes,
    ...UserRoutes,
];
