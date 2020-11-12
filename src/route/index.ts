import {ExamRoutes} from "./ExamRoutes";
import {UserRoutes} from "./UserRoutes";
import {StudentCourseRoutes} from "./StudentCourseRoutes";

export const Routes = [
    ...ExamRoutes,
    ...StudentCourseRoutes,
    ...UserRoutes,
]