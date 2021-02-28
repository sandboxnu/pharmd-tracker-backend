import {StudentExamController} from "../controller/StudentExamController";
import {Config as config} from "./Config";

const BASE_PATH = "/studentExams";

export const StudentExamRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: StudentExamController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: StudentExamController,
        action: "findById"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: StudentExamController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: StudentExamController,
        action: "save"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: StudentExamController,
        action: "remove"
    }
];