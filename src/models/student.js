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
            allowNull: true
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
            allowNull: true,
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
            allowNull: true,
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

    // get students that match the given JSON parameters
    Student.filter = async (params) => {
        return Student.findAll({
            where: params
        });
    };

    const { Op } = require("sequelize");

    Student.parseQuery = async (queryObj) => {
        let where = {};
        let queryParams = ['NUID', 'firstName', 'lastName', 'visa', 'entryType', 'dualDegree', 'entryToP1',
            'originalGradDate', 'adjustedGradDate', 'gradDateChange', 'leftProgram', 'status', 'GPA'];

        for (const param of queryParams) {
            if (param in queryObj) {
                let query = queryObj[param];

                if (param === "firstName" || param === "lastName") {
                    where[param] = {[Op.startsWith]: query};
                }

                if (! ('min' in query || 'max' in query)) {
                    where[param] = query;
                }
                else {
                    if ('min' in query) {
                        where[param][[Op.gte]] = query.min;
                    }
                    if ('max' in query) {
                        where[param][[Op.lte]] = query.max;
                    }
                }
            }
        }

        return where;
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
            where: {firstName, lastName}
        })
    };

    // ----- courses from student -----

    // gets all courses of the student with the given NUID
    Student.getCoursesByNUID = async (nuid) => {
        const student = await Student.findByNUID(nuid);
        return student.getCourses();
    };

    // ----- assessments from student -----

    /**
     * Gets all assessments of the student with the given NUID
     * @param nuid {string}
     * @returns {Promise<*>}
     */
    Student.getAssessmentsByNUID = async (nuid) => {
        const student = await Student.findByNUID(nuid);
        return student.getAssessments();
    };

    /**
     * Gets all given students notes
     * @param nuid {string}
     * @returns {Promise<*>}
     */
    Student.getStudentNotes = async (nuid) => {
        const student = await Student.findByNUID(nuid);
        return student.getNotes();
    };

    /**
     * Gets all given student's PCFs
     * @param nuid {string}
     * @returns {Promise<*>}
     */
    Student.getStudentPCFs = async (nuid) => {
        const student = await Student.findByNUID(nuid);
        return student.getPCFs();
    };

    // --------------------------- POST METHODS ---------------------------

    Student.addNewStudent = async (student) => Student.create({
        ...student
    });

    /**
     * A student with basic information, sent from frontend
     * @typedef {Object<string, any>} BasicStudent
     * @property {string} NUID the NUID of this student
     * @property {string} lastName the student's surname
     * @property {string} firstName the student's first name
     * @property {string | null} preferredName the student's preferred first name
     * @property {string | null} visa
     * @property {string | null} entryType
     * @property {string | null} dualDegree
     * @property {string} originalGradDate
     * @property {number} GPA
     * @property {string | null} leftProgram
     */

    /**
     * Adds many students to the DB
     * @param {Array<BasicStudent>} students The student to add to the DB
     * @returns {Promise<M[]>}
     */
    Student.addManyStudents = async (students) => {
        const promises = [];
        students.forEach(student => {
            promises.push(Student.create({
                ...student
            }));
        });
        return Promise.all(promises);
    };



    // --------------------------- PUT METHODS ---------------------------

    /**
     * Updates the student in the DB with the given NUID
     * @param NUID {string}
     * @param studentInfo {BasicStudent}
     * @returns {Promise}
     */
    Student.updateStudent = async (NUID, studentInfo) =>
        Student.update({
        ...studentInfo
    }, {
        where: {
            NUID: NUID
        }
    });


    return Student;
};
export default student;
