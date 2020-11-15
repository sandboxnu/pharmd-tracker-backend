import {CourseRoutes} from './CourseRoutes';
import {ExamRoutes} from "./ExamRoutes";
import {NoteRoutes} from "./NoteRoutes";
import {StudentCourseRoutes} from "./StudentCourseRoutes";
import {StudentExamRoutes} from "./StudentExamRoutes";
import {StudentRoutes} from "./StudentRoutes";
import {UserRoutes} from "./UserRoutes";

export const Routes = [
    ...CourseRoutes,
    ...ExamRoutes,
    ...NoteRoutes,
    ...StudentCourseRoutes,
    ...StudentExamRoutes,
    ...StudentRoutes,
    ...UserRoutes,
];
