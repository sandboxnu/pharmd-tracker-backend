<<<<<<< HEAD
import {CourseRoutes} from './CourseRoutes';
import {ExamRoutes} from './ExamRoutes';
import {NoteRoutes} from './NoteRoutes';
import {StudentExamRoutes} from "./StudentExamRoutes";
import {StudentCourseRoutes} from "./StudentCourseRoutes";
import {UserRoutes} from './UserRoutes';

export const Routes = [
    ...CourseRoutes,
    ...ExamRoutes,
    ...NoteRoutes,
    ...StudentCourseRoutes,
    ...StudentExamRoutes,
    ...UserRoutes,
];
