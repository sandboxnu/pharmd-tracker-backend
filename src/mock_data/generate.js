const _ = require('lodash');
const fs = require('fs');

function generateData() {
    let courses = require('./generators/course_generator');
    let exams = require('./generators/exam_generator');
    let notes = require('./generators/note_generator');
    let studentCourses = require('./generators/student_course_generator');
    let studentExams = require('./generators/student_exam_generator');
    let students = require('./generators/student_generator');

    // Connect exams to courses
    const examConnections = connectToExams(exams, courses);
    exams = examConnections.exams;
    courses = examConnections.courses;

    // Connect students to notes and studentCourses
    const studentConnections = connectToStudents(students, notes, studentCourses);
    students = studentConnections.students;
    notes = studentConnections.notes;
    studentCourses = studentConnections.studentCourses;

    // Connect courses to studentCourses
    const courseConnections = connectToCourses(courses, studentCourses);
    courses = courseConnections.courses;
    studentCourses = courseConnections.studentCourses;

    // Connect studentExams to exams and students
    const studentExamConnections = connectToStudentExams(studentExams, exams, studentCourses, courses, students);
    studentExams = studentExamConnections.studentExams;
    exams = studentExamConnections.exams;
    students = studentExamConnections.students;

    const data = {
        users: [],
        courses: courses,
        exams: exams,
        notes: notes,
        studentCourses: studentCourses,
        studentExams: studentExams,
        students: students
    }

    const output = JSON.stringify(data, null, 2);
    fs.writeFile('db.json', output, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return data;
}

// Connect exams to courses
function connectToExams(exams, courses) {
    // odd courses have 3 exams, even have 2
    let currentExamNumber;
    let currentExam = 0;

    // Courses
    for (i = 0; i < courses.length && currentExam < exams.length; i++) {
        currentExamNumber = i % 2 == 0 ? 2 : 3;

        let course = courses[i];
        let exam;

        for (j = 0; j < currentExamNumber && currentExam < exams.length; j++) {
            exam = exams[currentExam];
            exam.course = course.id;
            course.exams.push(exam.id);
            exams[currentExam] = exam;
            currentExam++;
        }

        courses[i] = course;
    }

    return {
        exams: exams,
        courses: courses
    }
}

// Connect courses to studentCourses
function connectToCourses(courses, studentCourses) {
    let numCourses = courses.length;
    let course;
    let studentCourse;
    let whichCourse;

    // StudentCourses
    for (i = 0; i < studentCourses.length; i++) {
        whichCourse = i % numCourses;
        studentCourse = studentCourses[i];
        course = courses[whichCourse];

        studentCourse.courseId = course.id;
        studentCourse.course = course.id;
        course.studentCourses.push(studentCourse.id);

        courses[whichCourse] = course;
        studentCourses[i] = studentCourse;
    }

    return {
        courses: courses,
        studentCourses: studentCourses
    }
}

// Connect students to notes and studentCourses
function connectToStudents(students, notes, studentCourses) {
    let currentNoteNumber;
    let currentNote = 0;
    let currentStudentCourse = 0;
    let currentStudentCourseNumber;

    for (i = 0; i < students.length; i++) {
        currentNoteNumber = i % 2 == 0 ? 1 : 2;

        let student = students[i];
        let note;

        // Notes
        for (j = 0; j < currentNoteNumber && currentNote < notes.length; j++) {
            note = notes[currentNote];
            note.student = student.id;
            student.notes.push(note.id);
            notes[currentNote] = note;
            currentNote++;
        }

        // StudentCourses
        if (i < 12) {
            currentStudentCourseNumber = 2;
        } else if (i < 37) {
            currentStudentCourseNumber = 4;
        } else {
            currentStudentCourseNumber = 8;
        }

        let studentCourse;
        for (j = 0; j < currentStudentCourseNumber && currentStudentCourse < studentCourses.length; j++) {
            studentCourse = studentCourses[currentStudentCourse];
            studentCourse.studentId = student.id;
            studentCourse.student = student.id;
            student.studentCourses.push(studentCourse.id);
            studentCourses[currentStudentCourse] = studentCourse;
            currentStudentCourse++;
        }

        students[i] = student;
    }

    return {
        students: students,
        notes: notes,
        studentCourses: studentCourses
    }
}

// Connect studentExams to exams and students
function connectToStudentExams(studentExams, exams, studentCourses, courses, students) {
    courses = _.groupBy(courses, function (n) {
        return n.id;
    })

    studentCourses = _.groupBy(studentCourses, function (n) {
        return n.id;
    })

    groupedStudents = _.groupBy(students, function (n) {
        return n.id;
    }) 

    // console.log(groupedStudents);

    let currentStudentExamNumber = 0;
    let currentCourseId;
    let exam;
    let studentExam;
    let student;
    let currentStudentCourses;
    let currentStudentId;
    let currentYear;
    let currentSemester;
    let currentStudentCourseId;
    let currentStudentCourse;

    for (i = 0; i < exams.length && currentStudentExamNumber < studentExams.length; i++) {
        // get student courses for this exam
        exam = exams[i];
        currentCourseId = exam.course;
        currentStudentCourses = courses[currentCourseId][0].studentCourses;

        for (j = 0; j < currentStudentCourses.length && currentStudentExamNumber < studentExams.length; j++) {
            studentExam = studentExams[currentStudentExamNumber];
            currentStudentCourseId = currentStudentCourses[j]; 
            currentStudentCourse = studentCourses[currentStudentCourseId][0];
            currentYear = currentStudentCourse.year;
            currentSemester = currentStudentCourse.semester;
            currentStudentId = currentStudentCourse.studentId;
            student = groupedStudents[currentStudentId][0];

            // exams
            studentExam.examId = exam.id;
            studentExam.exam = exam.id;
            studentExam.semester = currentSemester;
            studentExam.year = currentYear;
            exam.studentExams.push(studentExam.id);

            // students
            student.studentExams.push(studentExam.id);
            studentExam.studentId = student.id;
            studentExam.student = student.id;

            groupedStudents[currentStudentId][0] = student;
            studentExams[currentStudentExamNumber] = studentExam;
            currentStudentExamNumber++;
        }

        exams[i] = exam;
    }


    // flatten groupedStudents
    let keys = Object.keys(groupedStudents);
    students = [];
    for (i = 0; i < keys.length; i++) {
        students.push(groupedStudents[keys[i]][0]);
    }


    return {
        studentExams: studentExams,
        exams: exams,
        students: students
    }
}

module.exports = generateData();