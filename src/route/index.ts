import {ExamRoutes} from "./ExamRoutes";
import {StudentCourseRoutes} from "./StudentCourseRoutes";
import {StudentExamRoutes} from "./StudentExamRoutes";
import {StudentRoutes} from "./StudentRoutes";
import {UserRoutes} from "./UserRoutes";

export const Routes = [
    ...ExamRoutes,
    ...StudentCourseRoutes,
    ...StudentExamRoutes,
    ...StudentRoutes,
    ...UserRoutes,
];