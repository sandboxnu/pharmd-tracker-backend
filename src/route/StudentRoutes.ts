import {StudentController} from "../controller/StudentController";
import {Config as config} from "./Config";

const BASE_PATH = "/students";

export const StudentRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: StudentController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: StudentController,
        action: "findById"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:studentId/courses/:courseId/exam-instances",
        controller: StudentController,
        action: "getStudentExamByCourse"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:studentId/courses/:courseId",
        controller: StudentController,
        action: "getStudentCourseByIds"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id/courses",
        controller: StudentController,
        action: "getCoursesByStudentId"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:studentId/exams/:examId",
        controller: StudentController,
        action: "getStudentExamByIds"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id/exams",
        controller: StudentController,
        action: "getExamsByStudentId"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id/notes",
        controller: StudentController,
        action: "getNotesByStudentId"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: StudentController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: StudentController,
        action: "save"
    },
    {
        method: config.PATCH,
        route: BASE_PATH + "/:id",
        controller: StudentController,
        action: "update"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: StudentController,
        action: "remove"
    },
];