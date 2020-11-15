import {ExamRoutes} from "./ExamRoutes";
import {UserRoutes} from "./UserRoutes";
import {StudentExamRoutes} from "./StudentExamRoutes";
import {StudentCourseRoutes} from "./StudentCourseRoutes";

export const Routes = [
    ...ExamRoutes,
    ...StudentCourseRoutes,
    ...StudentExamRoutes,
    ...UserRoutes,
]