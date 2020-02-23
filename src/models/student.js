const student = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        NUID: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        preferredName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull:false
        },
        visa: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        entryType: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        // semester of entry
        entryToP1: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        originalGradDate: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        adjustedGradDate: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        gradDateChange: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
            allowNull:true
        },
        dualDegree: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        leftProgram: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        GPA: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull:true
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
    Student.searchByName = async(firstName, lastName) => {
        return Student.findAll( {
            where: {firstName: firstName}
        })
    };

    // ----- courses from student -----

    // gets all courses of the student with the given NUID
    Student.getCoursesByNUID = async (nuid) => {
        return Student.findByNUID(nuid).getCourses();
    };

    // TODO get current courses of student with given NUID

    // TODO get courses from a given semester of student with given NUID

    // ----- assessments from student -----

    // gets all assessments of the student with the given NUID
    Student.getAssessmentsByNUID = async (nuid) => {
        return Student.findByNUID(nuid).getAssessments();
    };

    // gets all assessments of the student with the given NUID in the given course
    Student.getCourseAssessmentsByNUID = async (nuid, courseID) => {
        return Student.getAssessmentsByNUID(nuid)
            .findAll({where: {courseID: courseID}});
    };

    // TODO getting grade in assessment/course?

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
