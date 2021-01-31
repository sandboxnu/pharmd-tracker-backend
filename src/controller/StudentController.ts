import {Between, Equal, getRepository, LessThanOrEqual, MoreThanOrEqual, Raw} from "typeorm";
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

            for (const param of paramList) {
                if (param in queryObj) {
                    let value = queryObj[param];

                    switch (param) {
                        case 'id':
                        case 'hasVisa':
                        case 'entryType':
                        case 'isDualDegree':
                        case 'entryDate':
                        case 'originalGradDate':
                        case 'gradDate':
                        case 'leftProgram':
                        case 'status':
                            where[param] = Equal(value);
                            break;
                        case 'firstName':
                        case 'lastName':
                        case 'preferredName':
                            where[param] = Raw(alias => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                            break;
                        case 'gpa':
                            //order of min and max don't matter for Between
                            where[param] = Between(value[0], value[1]);
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

            const courses = await Promise.all(
                studentCourses.map(async (studentCourse) => {
                    // get course from studentCourse
                    return await this.courseRepository.find({
                        where: {
                            id: studentCourse.courseId
                        }
                    });
                })
            );

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

            const exams = await Promise.all(
                studentExams.map(async (studentExam) => {
                    // get exam from studentExam
                    return await this.examRepository.find({
                        where: {
                            id: studentExam.examId
                        }
                    });
                })
            );

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
            );

            const studentExams = await Promise.all(
                // get studentExams from exams for course
                examsForCourse.map(async (exam) => {
                    return await this.studentExamRepository.find({
                        where: {
                            studentId: request.params.studentId,
                            examId: exam.id,
                        }
                    });
                })
            );

            await response.set({
                'X-Total-Count': studentExams.length,
                'Access-Control-Expose-Headers': ['X-Total-Count']
            });

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
