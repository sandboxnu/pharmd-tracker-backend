import {ExamRoutes} from "./ExamRoutes";
import {UserRoutes} from "./UserRoutes";
import {StudentExamRoutes} from "./StudentExamRoutes";

export const Routes = [
    ...ExamRoutes,
    ...StudentExamRoutes,
    ...UserRoutes,
]