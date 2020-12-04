import {ExamController} from "../controller/ExamController";

export const ExamRoutes = [
    {
        method: "get",
        route: "/exams",
        controller: ExamController,
        action: "filter"
    },
    {
        method: "get",
        route: "/exams/:id",
        controller: ExamController,
        action: "findById"
    },
    {
        method: "post",
        route: "/exams",
        controller: ExamController,
    },
    {
        method: "put",
        route: "/exams/:id",
        controller: ExamController,
        action: "save"
    },
    {
        method: "delete",
        route: "/exams/:id",
        controller: ExamController,
        action: "remove"
    },
    {
        method: "get",
        route: "/exams/:id/instances",
        controller: ExamController,
        action: "getStudentExamsByExamId"
    }
];
