import {CourseController} from "../controller/CourseController";

export const CourseRoutes = [
    {
        method: "get",
        route: "/courses/q",
        controller: CourseController,
        action: "filter"
    },
    {
        method: "get",
        route: "/courses",
        controller: CourseController,
        action: "all"
    },
    {
        method: "get",
        route: "/courses/:courseId",
        controller: CourseController,
        action: "findById"
    },
    {
        method: "get",
        route: "/courses/:courseName",
        controller: CourseController,
        action: "findByName"
    },
    {
        method: "post",
        route: "/courses",
        controller: CourseController,
        action: "save"
    },
    {
        method: "put",
        route: "/courses/:courseId",
        controller: CourseController,
        action: "update"
    }, {

        method: "delete",
        route: "/courses/:id",
        controller: CourseController,
        action: "remove"
    }
];