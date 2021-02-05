import {StudentCourseController} from "../controller/StudentCourseController";

export const StudentCourseRoutes = [
    {
        method: "get",
        route: "/studentCourses",
        controller: StudentCourseController,
        action: "filter"
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
        action: "save"
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
