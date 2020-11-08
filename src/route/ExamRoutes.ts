import {ExamController} from "../controller/ExamController";

export const ExamRoutes = [{
    method: "get",
    route: "/exams",
    controller: ExamController,
    action: "all"
}, {
    method: "get",
    route: "/exams/q",
    controller: ExamController,
    action: "filter"
}, {
    method: "get",
    route: "/exams/:id",
    controller: ExamController,
    action: "findById"
}, {
    method: "get",
    route: "/exams/:id/instances",
    controller: ExamController,
    action: "getStudentsByExam"
}, {
    method: "post",
    route: "/exams",
    controller: ExamController,
},  {
    method: "put",
    route: "/exams/:id",
    controller: ExamController,
    action: "save"
}, {
    method: "delete",
    route: "/exams/:id",
    controller: ExamController,
    action: "remove"
},];
