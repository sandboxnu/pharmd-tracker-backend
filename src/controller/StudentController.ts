import {Equal, getRepository, Between, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Student} from "../entity/Student";
import {Course} from "../entity/Course";
import {Exam} from "../entity/Exam";
import {Note} from "../entity/Note";
import {StudentCourse} from "../entity/StudentCourse";
import {StudentExam} from "../entity/StudentExam";

export class StudentController {

    private studentRepository = getRepository(Student);
    private courseRepository = getRepository(Course);
    private examRepository = getRepository(Exam);
    private noteRepository = getRepository(Note);
    private studentCourseRepository = getRepository(StudentCourse);
    private studentExamRepository = getRepository(StudentExam);

    // get all students
    async all(request: Request, response: Response, next?: NextFunction) {
        try {
            const students = await this.studentRepository.find();
            await response.set({
                'X-Total-Count': students.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return students;
        } catch (e) {
            return e;
        }
    }

    // gets assessments that match the given query params
    async parseQuery(queryObj) {
        try {
            let where = {};
            const paramList = Object.keys(queryObj);
            // const queryParams = ['NUID', 'firstName', 'lastName', 'visa', 'entryType', 'dualDegree', 'entryToP1',
            //     'originalGradDate', 'adjustedGradDate', 'gradDateChange', 'leftProgram', 'status', 'GPA'];

            for (const param of paramList) {
                if (param in queryObj) {
                    let value = queryObj[param];

                    switch (param) {
                        case 'id':
                        case 'visa':
                        case 'entryType':
                        case 'dualDegree':
                        case 'originalGradDate':
                        case 'adjustedGradDate':
                        case 'leftProgram':
                        case 'status':
                            where[param] = Equal(value);
                            break;
                        case 'firstName':
                        case 'lastName':
                            where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                            break;
                        case 'gpa':
                            const hasMin = value.hasOwnProperty('min');
                            const hasMax = value.hasOwnProperty('max');
                            if (hasMin && hasMax) {
                                where[param] = Between(value.min, value.max);
                            } else if (hasMax) {
                                where[param] = LessThanOrEqual(value.max);
                            } else if (hasMin) {
                                where[param] = MoreThanOrEqual(value.min);
                            } else {
                                where[param] = Equal(value);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            return where;
        } catch (e) {
            return e;
        }

    };

    async filter(request: Request, response: Response, next?: NextFunction) {
        try {
            const parsedParams = await this.parseQuery(request.query);
            const students = await this.studentRepository.find({
                where: parsedParams
            });
            await response.set({
                'X-Total-Count': students.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return students;
        } catch (e) {
            return e;
        }
    };

    // get student by id
    async findById(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentRepository.findOne({
                where: {id: request.params.id}
            });
        } catch (e) {
            return e;
        }
    }

    async getCoursesByStudentId(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentCourses = await this.studentCourseRepository.find({
                where: {
                    studentId: request.params.id,
                }
            });

            const coursesPromises = studentCourses.map(async (studentCourse) => {
                const course = await this.courseRepository.find({
                    where: {
                        id: studentCourse.courseId
                    }
                });
                return course;
            });
            const courses = await Promise.all(coursesPromises);

            await response.set({
                'X-Total-Count': courses.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return courses;
        } catch (e) {
            return e;
        }
    }

    async getStudentCourseByIds(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentCourseRepository.findOne({
                where: {
                    studentId: request.params.studentId,
                    courseId: request.params.courseId,
                }
            });
        } catch (e) {
            return e;
        }
    }

    async getExamsByStudentId(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentExams = await this.studentExamRepository.find({
                where: {
                    studentId: request.params.id,
                }
            });

            const examsPromises = studentExams.map(async (studentExam) => {
                const exam = await this.examRepository.find({
                    where: {
                        id: studentExam.examId
                    }
                });
                return exam;
            });
            const exams = await Promise.all(examsPromises);

            await response.set({
                'X-Total-Count': exams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return exams;
        } catch (e) {
            return e;
        }
    }

    async getStudentExamByIds(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentExamRepository.findOne({
                where: {
                    studentId: request.params.studentId,
                    examId: request.params.examId,
                }
            });
        } catch (e) {
            return e;
        }
    }


    async getStudentExamByCourse(request: Request, response: Response, next?: NextFunction) {
        try {
            const examsForCourse = await this.examRepository.find(
                {
                    course: request.params.courseId
                }
            )
            const studentExamsPromises = examsForCourse.map(async (exam) => {
                console.log(request.params.studentId)
                const studentExam = await this.studentExamRepository.find({
                    where: {
                        studentId: request.params.studentId,
                        examId: exam.id,
                    }});
                return studentExam;
            });
            const studentExams = await Promise.all(studentExamsPromises);

            return studentExams;
        } catch (e) {
            return e;
        }
    }

    async getNotesByStudentId(request: Request, response: Response, next?: NextFunction) {
        try {
            const notes = await this.noteRepository.find({
                where: {
                    student: request.params.id,
                }
            });
            await response.set({
                'X-Total-Count': notes.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });
            return notes;
        } catch (e) {
            return e;
        }
    }

    async save(request: Request, response: Response, next?: NextFunction) {
        try {
            return await this.studentRepository.save(request.body);
        } catch (e) {
            return e;
        }
    }

    async remove(request: Request, response: Response, next?: NextFunction) {
        try {
            const studentToRemove = await this.studentRepository.findOne(request.params.id);
            await this.studentRepository.remove(studentToRemove);
            return studentToRemove;
        } catch (e) {
            return e;
        }
    }

}
