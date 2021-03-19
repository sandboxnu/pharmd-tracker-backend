import {StudentCourseController} from "../controller/StudentCourseController";
import {Config as config} from "./Config";

const BASE_PATH = "/studentCourses";

export const StudentCourseRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: StudentCourseController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: StudentCourseController,
        action: "findById"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: StudentCourseController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: StudentCourseController,
        action: "update"
    },
    {
        method: config.PATCH,
        route: BASE_PATH + "/:id",
        controller: StudentCourseController,
        action: "save"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: StudentCourseController,
        action: "remove"
    }
];
