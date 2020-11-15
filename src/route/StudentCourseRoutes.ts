import {StudentCourseController} from "../controller/StudentCourseController";

export const StudentCourseRoutes = [
    {
        method: "get",
        route: "/studentCourses/q?",
        controller: StudentCourseController,
        action: "filter"
    },
    {
        method: "get",
        route: "/studentCourses",
        controller: StudentCourseController,
        action: "all"
    },
    {
        method: "get",
        route: "/studentCourses/:id",
        controller: StudentCourseController,
        action: "findById"
    },
    {
        method: "post",
        route: "/studentCourses",
        controller: StudentCourseController,
    },
    {
        method: "put",
        route: "/studentCourses/:id",
        controller: StudentCourseController,
        action: "save"
    },
    {
        method: "delete",
        route: "/studentCourses/:id",
        controller: StudentCourseController,
        action: "remove"
    }
];
