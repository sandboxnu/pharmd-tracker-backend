import {StudentExamController} from "../controller/StudentExamController";

export const StudentExamRoutes = [
    {
        method: "get",
        route: "/studentExams",
        controller: StudentExamController,
        action: "filter"
    },
    {
        method: "get",
        route: "/studentExams/:id",
        controller: StudentExamController,
        action: "findById"
    },
    {
        method: "post",
        route: "/studentExams",
        controller: StudentExamController,
        action: "save"
    },
    {
        method: "put",
        route: "/studentExams/:id",
        controller: StudentExamController,
        action: "save"
    },
    {
        method: "delete",
        route: "/studentExams/:id",
        controller: StudentExamController,
        action: "remove"
    }
];