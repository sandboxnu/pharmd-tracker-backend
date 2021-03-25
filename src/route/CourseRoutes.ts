import {CourseController} from "../controller/CourseController";
import {Config as config} from "./Config";

const BASE_PATH = "/courses";

export const CourseRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: CourseController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: CourseController,
        action: "findById"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: CourseController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: CourseController,
        action: "save"
    },
    {
        method: config.PATCH,
        route: BASE_PATH + "/:id",
        controller: CourseController,
        action: "update"
    },
    {

        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: CourseController,
        action: "remove"
    }
];