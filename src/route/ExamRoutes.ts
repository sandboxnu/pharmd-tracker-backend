import {ExamController} from "../controller/ExamController";
import {Config as config} from "./Config";

const BASE_PATH = "/exams";

export const ExamRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: ExamController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: ExamController,
        action: "findById"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: ExamController,
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: ExamController,
        action: "save"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: ExamController,
        action: "remove"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id/instances",
        controller: ExamController,
        action: "getStudentExamsByExamId"
    }
];
