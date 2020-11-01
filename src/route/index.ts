import {Router} from 'express';
import courseRouter from './CourseRoutes';
// import examRouter from './ExamRoutes';
// import noteRouter from './NoteRoutes';
// import userRouter from './UserRoutes';
// import studentRouter from './StudentRoutes';
// import studentCourseRouter from './StudentCourseRoutes';
// import studentExamRouter from './StudentExamRoutes';

const routes = Router();

routes.use('/courses', courseRouter);
// app.use('/exams', examRouter);
// app.use('/notes', noteRouter);
// app.use('/users', userRouter);
// app.use('/students', studentRouter);
// app.use('/student-courses', studentCourseRouter);
// app.use('/student-exam', studentExamRouter);


export default routes;