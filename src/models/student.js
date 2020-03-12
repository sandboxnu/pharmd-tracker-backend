import Sequelize, {DataTypes} from "sequelize";
import {sequelize} from "./index";

const student = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        NUID: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [9, 9],
                    msg: "ID must consist of 9 digits"
                }
            },
            primaryKey: true,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        preferredName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        visa: {
            type: DataTypes.ENUM("F1", ""),
            allowNull: true,
            unique: false,
        },
        entryType: {
            type: DataTypes.ENUM("DE", "EA"),
            allowNull: true,
            unique: false,
        },
        dualDegree: {
            type: DataTypes.ENUM("MPH", ""),
            allowNull: true,
            unique: false,
        },
        // semester of entry
        entryToP1: {
            // should only be length of 7 (FL 2019)
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [7, 7],
                    msg: "Entry to program should be 7 characters long. Example: 'FL 2019'"
                }
            },
            unique: false,
            allowNull: false
        },
        originalGradDate: {
            // should only be length 5 (22/23)
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 5],
                    msg: "Original graduation date should be 5 characters long. Example: '22/23'"
                }
            },
            allowNull: false,
            unique: false,
        },
        adjustedGradDate: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 5],
                    msg: "Adjusted graduation date should be 5 characters long. Example: '22/23'"
                }
            },
            unique: false,
            allowNull: true
        },
        gradDateChange: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
            allowNull: true
        },
        leftProgram: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('Enrolled', "Leave", "Drop Back", "Co-Op"),
            unique: false,
            allowNull: true
        },
        GPA: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 4
            },
            unique: false,
        }
    });

    // --------------------------- GET METHODS ---------------------------

    // ----- groups of students -----

    // get all students in DB
    Student.getAllStudents = async () => {
        return Student.findAll();
    };

    // get all students in the given cohort
    Student.getCohort = async (cohort) => {
        return Student.findAll({
            where: {adjustedGradDate: cohort}
        });
    };

    // get all international students (students with an 'F1' visa
    Student.getInternational = async () => {
        return Student.findAll({
            where: {visa: 'F1'}
        });
    };

    // ----- one student -----

    // get the student with the given NUID
    Student.findByNUID = async nuid => {
        return Student.findOne({
            where: {NUID: nuid}
        });
    };

    // get the first student with the given first and last name
    Student.findByFirstLastName = async (firstName, lastName) => {
        return Student.findOne({
            where: {firstName: firstName, lastName: lastName},
        });
    };

    // TODO would it be necessary to have method that returns all students with given name for searches?
    Student.searchByName = async (firstName, lastName) => {
        return Student.findAll({
            where: {firstName: firstName}
        })
    };

    // ----- courses from student -----

    // gets all courses of the student with the given NUID
    Student.getCoursesByNUID = async (nuid) => {
        return Student.findByNUID(nuid).getCourses();
    };

    // ----- assessments from student -----

    // gets all assessments of the student with the given NUID
    Student.getAssessmentsByNUID = async (nuid) => {
        return Student.findByNUID(nuid).getAssessments();
    };

    // gets all given students notes
    Student.getStudentNotes = async (nuid) => {
        return Student.findByNUID(nuid).getNotes();
    };

    // --------------------------- POST METHODS ---------------------------

    Student.addNewStudent = async (student) => Student.create({
        ...student
    });

    // --------------------------- PUT METHODS ---------------------------

    Student.updateStudent = async (NUID, studentInfo) => Student.update({
        ...studentInfo
    }, {
        where: {
            NUID
        }
    });
    return Student;
};
export default student;
