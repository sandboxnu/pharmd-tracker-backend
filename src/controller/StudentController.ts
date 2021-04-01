import {
  Between, Brackets, Equal, getRepository, In, Raw,
} from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Student } from '../entity/Student';
import { Course } from '../entity/Course';
import { Exam } from '../entity/Exam';
import { Note } from '../entity/Note';
import { StudentCourse } from '../entity/StudentCourse';
import { StudentExam } from '../entity/StudentExam';

class StudentController {
    private studentRepository = getRepository(Student);

    private courseRepository = getRepository(Course);

    private examRepository = getRepository(Exam);

    private noteRepository = getRepository(Note);

    private studentCourseRepository = getRepository(StudentCourse);

    private studentExamRepository = getRepository(StudentExam);

    private static readonly STUDENT_ALIAS = 'student';

    // get all students
    // eslint-disable-next-line no-unused-vars
    async all(request: Request, response: Response, next?: NextFunction) {
      try {
        const students = await this.studentRepository.find();
        await response.set({
          'X-Total-Count': students.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });
        return students;
      } catch (e) {
        return e;
      }
    }

    // gets assessments that match the given query params
    // eslint-disable-next-line class-methods-use-this
    async parseQuery(queryObj) {
      try {
        const where = {};
        const paramList = Object.keys(queryObj);

        for (const param of paramList) {
          if (param in queryObj) {
            const value = queryObj[param];

            switch (param) {
              case 'id':
              case 'hasVisa':
              case 'entryType':
              case 'isDualDegree':
              case 'entryDate':
              case 'originalGradDate':
              case 'gradDate':
              case 'leftProgram':
                where[param] = Equal(value);
                break;
              case 'status':
                where[param] = Array.isArray(value) ? In(value) : Equal(value);
                break;
              case 'firstName':
              case 'lastName':
              case 'preferredName':
                where[param] = Raw((alias) => `LOWER(${alias}) LIKE '%${value.toLowerCase()}%'`);
                break;
              case 'gpa':
                if (Array.isArray(value)) {
                  value.sort();
                  where[param] = Between(value[0], value[1]);
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
    }

    // eslint-disable-next-line no-unused-vars
    async filter(request: Request, response: Response, next?: NextFunction) {
      try {
        const start: number = request.query._start ? request.query._start : 0;
        const end: number = request.query._end ? request.query._end : 0;
        const order = request.query._order ? request.query._order : 'ASC';
        const cohort = request.query._sort === 'cohort'
          ? 'gradDate'
          : request.query._sort;
        const sort = request.query._sort
          ? cohort
          : 'id';

        const nameLikeArray = request.query.name_like
          ? request.query.name_like.replace('^', '').trim().split(' ')
          : '';
        const trimmedText = StudentController.trimTextWithWildCard(nameLikeArray[0]);
        const maybeLastName = nameLikeArray[1] ? `%${nameLikeArray[1]}%` : trimmedText;
        const trimmedId = StudentController.trimTextWithWildCard(request.query.id_like);

        const parsedParams = await this.parseQuery(request.query);

        const students = await this.studentRepository
          .createQueryBuilder(StudentController.STUDENT_ALIAS)
          .where(parsedParams)
          .andWhere(new Brackets((qb) => {
            qb.where(`${StudentController.STUDENT_ALIAS}.id ILIKE :trimmedId`,
              { trimmedId: trimmedId === trimmedText ? '%%' : trimmedId })
              .orWhere(`${StudentController.STUDENT_ALIAS}.firstName ILIKE :trimmedText`,
                { trimmedText })
              .orWhere(`${StudentController.STUDENT_ALIAS}.lastName ILIKE :maybeLastName`,
                { maybeLastName });
          }))
          .orderBy(`${StudentController.STUDENT_ALIAS}.${sort}`, order)
          .limit(end - start)
          .skip(start)
          .getMany();

        await response.set({
          'X-Total-Count': students.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });
        return students;
      } catch (e) {
        return e;
      }
    }

    // get student by id
    // eslint-disable-next-line no-unused-vars
    async findById(request: Request, response: Response, next?: NextFunction) {
      try {
        return await this.studentRepository.findOne({
          where: {
            id: request.params.id,
          },
        });
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getCoursesByStudentId(request: Request, response: Response, next?: NextFunction) {
      try {
        const studentCourses = await this.studentCourseRepository.find({
          where: {
            student: request.params.id,
          },
        });

        const courses = await Promise.all(
          studentCourses.map(async (studentCourse) =>
          // get course from studentCourse
          // eslint-disable-next-line implicit-arrow-linebreak,no-return-await
            await this.courseRepository.findOne({
              where: {
                id: studentCourse.course.id,
              },
            })),
        );

        await response.set({
          'X-Total-Count': courses.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });
        return courses;
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getStudentCourseByIds(request: Request, response: Response, next?: NextFunction) {
      try {
        return await this.studentCourseRepository.findOne({
          where: {
            student: request.params.studentId,
            course: request.params.courseId,
          },
        });
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getExamsByStudentId(request: Request, response: Response, next?: NextFunction) {
      try {
        const studentExams = await this.studentExamRepository.find({
          where: {
            student: request.params.id,
          },
        });

        const exams = await Promise.all(
          studentExams.map(async (studentExam) =>
          // get exam from studentExam
          // eslint-disable-next-line implicit-arrow-linebreak,no-return-await
            await this.examRepository.findOne({
              where: {
                id: studentExam.exam.id,
              },
            })),
        );

        await response.set({
          'X-Total-Count': exams.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });
        return exams;
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getStudentExamByIds(request: Request, response: Response, next?: NextFunction) {
      try {
        return await this.studentExamRepository.findOne({
          where: {
            student: request.params.studentId,
            exam: request.params.examId,
          },
        });
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getStudentExamByCourse(request: Request, response: Response, next?: NextFunction) {
      try {
        const examsForCourse = await this.examRepository.find(
          {
            course: request.params.courseId,
          },
        );

        const studentExams = await Promise.all(
          // get studentExams from exams for course
          // eslint-disable-next-line no-return-await
          examsForCourse.map(async (exam) => await this.studentExamRepository.find({
            where: {
              student: request.params.studentId,
              exam: exam.id,
            },
          })),
        );

        await response.set({
          'X-Total-Count': studentExams.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });

        return studentExams;
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async getNotesByStudentId(request: Request, response: Response, next?: NextFunction) {
      try {
        const notes = await this.noteRepository.find({
          where: {
            student: request.params.id,
          },
        });
        await response.set({
          'X-Total-Count': notes.length,
          'Access-Control-Expose-Headers': ['X-Total-Count'],
        });
        return notes;
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async save(request: Request, response: Response, next?: NextFunction) {
      try {
        return await this.studentRepository.save(request.body);
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async update(request: Request, response: Response, next?: NextFunction) {
      try {
        const student = await this.studentRepository.findOne({
          where: { id: request.params.id },
        });
        const updateBody = { ...student, ...request.body };
        return await this.studentRepository.save(updateBody);
      } catch (e) {
        return e;
      }
    }

    // eslint-disable-next-line no-unused-vars
    async remove(request: Request, response: Response, next?: NextFunction) {
      try {
        const studentToRemove = await this.studentRepository.findOne(request.params.id);
        await this.studentRepository.remove(studentToRemove);
        return studentToRemove;
      } catch (e) {
        return e;
      }
    }

    private static trimTextWithWildCard(text) {
      return text ? `%${text.replace('^', '').trim()}%` : '';
    }
}

export default StudentController;
