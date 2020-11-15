import {StudentController} from "../controller/StudentController";

export const StudentRoutes = [
    {
        method: "get",
        route: "/students",
        controller: StudentController,
        action: "filter"
    },
    {
        method: "get",
        route: "/students/:id",
        controller: StudentController,
        action: "findById"
    },
    {
        method: "get",
        route: "/students/:studentId/courses/:courseId/exam-instances",
        controller: StudentController,
        action: "getStudentExamByCourse"
    },
    {
        method: "get",
        route: "/students/:studentId/courses/:courseId",
        controller: StudentController,
        action: "getStudentCourseByIds"
    },
    {
        method: "get",
        route: "/students/:id/courses",
        controller: StudentController,
        action: "getCoursesByStudentId"
    },
    {
        method: "get",
        route: "/students/:studentId/exams/:examId",
        controller: StudentController,
        action: "getStudentExamByIds"
    },
    {
        method: "get",
        route: "/students/:id/exams",
        controller: StudentController,
        action: "getExamsByStudentId"
    },
    {
        method: "get",
        route: "/students/:id/notes",
        controller: StudentController,
        action: "getNotesByStudentId"
    },
    {
        method: "post",
        route: "/students",
        controller: StudentController,
        action: "save"
    },
    {
        method: "put",
        route: "/students/:id",
        controller: StudentController,
        action: "save"
    },
    {
        method: "delete",
        route: "/students/:id",
        controller: StudentController,
        action: "remove"
    },
];