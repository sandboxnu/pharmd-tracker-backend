const student = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        NUID: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true,
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
            allowNull: false
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
            allowNull: false
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

    /**
     * A student with basic information, sent from frontend
     * @typedef {Object<string, any>} BasicStudent
     * @property {string} NUID the NUID of this student
     * @property {string} lastName the student's surname
     * @property {string} firstName the student's first name
     * @property {string | null} preferredName the student's preferred first name
     * @property {'F1' | '' | null} visa
     * @property {'DE' | 'EA' | null} entryType
     * @property {'MPH' | '' | null} dualDegree
     * @property {string} originalGradDate
     * @property {number} GPA
     * @property {string | null} leftProgram
     */

    /**
     * @typedef {BasicStudent} FullStudent
     * @property {string | null} entryToP1
     * @property {string | null} adjustedGradDate
     * @property {Array<string> | null} gradDateChange
     * @property {'Enrolled' | 'Leave' | 'Drop Back' | 'Co-Op' | null} status
     *
     * !
     */

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


    /**
     * Adds a new student to the DB
     * @param {FullStudent} student
     * @returns {Promise}
     */
    Student.addNewStudent = async (student) => {
        const newStudent = Student.build({
            NUID: student.NUID,
            firstName: student.firstName,
            lastName: student.lastName,
            originalGradDate: student.originalGradDate
        });
        newStudent.preferredName = student.preferredName ? student.preferredName : null;

        const visaDefaultValue = "";
        newStudent.visa = student.visa ? student.visa : visaDefaultValue;

        newStudent.entryType = student.entryType ? student.entryType : null;

        const dualDegreeDefaultValue = "";
        newStudent.dualDegree = student.dualDegree ? student.dualDegree : dualDegreeDefaultValue;

        const entryToP1DefaultValue = getP1Entry(student.originalGradDate);
        newStudent.entryToP1 = student.entryToP1 ? student.entryToP1 : entryToP1DefaultValue;

        const adjustedGradDateDefaultValue = student.originalGradDate;
        newStudent.adjustedGradDate = student.adjustedGradDate ? student.adjustedGradDate : adjustedGradDateDefaultValue;

        const gradDateChangeDefaultValue = [];
        newStudent.gradDateChange = student.gradDateChange ? student.gradDateChange : gradDateChangeDefaultValue;

        newStudent.leftProgram = student.leftProgram ? student.leftProgram : null;

        const statusDefaultValue = 'Enrolled';
        newStudent.status = student.status ? student.status : statusDefaultValue;

        return newStudent.save();
    };

    /**
     * Gets entry to P1 if none supplied, based on grad date
     * @param {string} originalGradDate Grad date, which is in the form YY/YY (ie 22/23)
     */
    const getP1Entry = (originalGradDate) => {
        const year = originalGradDate.substr(0, 2);
        const semester  = "FL";
        return `${semester} 20${year - 3}`
    };

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
