import {CourseController} from "../controller/CourseController";

export const CourseRoutes = [
    {
        method: "get",
        route: "/courses",
        controller: CourseController,
        action: "filter"
    },
    {
        method: "get",
        route: "/courses/:id",
        controller: CourseController,
        action: "findById"
    },
    {
        method: "post",
        route: "/courses",
        controller: CourseController,
        action: "save"
    },
    {
        method: "put",
        route: "/courses/:id",
        controller: CourseController,
        action: "save"
    }, {

        method: "delete",
        route: "/courses/:id",
        controller: CourseController,
        action: "remove"
    }
];