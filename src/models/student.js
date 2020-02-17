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
        },
        notes: {
            type: DataTypes.STRING,
            unique: false,
            allowNull:true
        }
    });

    /**
     * Gets all students in the DB
     * @returns {Promise<<Model[]>>} a promise to respond query
     */
    Student.getAllStudents = async () => {
        return Student.findAll();
    };
    /**
     * Gets all students with the given cohort
     * @param cohort the requested cohort
     * @returns {Promise<<Model[]>>}
     */
    Student.getCohort = async (cohort) => {
        return Student.findAll({
            where: {adjustedGradDate: cohort}
        });
    };
    Student.getCourses = async (nuid) => {
        const student = Student.findOne({where: {NUID: nuid}});
        return student.getCourses();
    };
    /**
     * Finds a student with the given NUID
     * @param nuid the requested NUID
     * @returns {Promise<<Model<any, any> | null>|<Model<any, any>>>}
     */
    Student.findByNUID = async nuid => {
        return Student.findOne({
            where: {NUID: nuid}
        });
    };
    /**
     * Finds a student with the given first and last name
     * @param firstName the requested first name
     * @param lastName the requested last name
     * @returns {Promise<<Model<any, any> | null>|<Model<any, any>>>}
     */
    Student.findByFirstLastName = async (firstName, lastName) => {
        return Student.findOne({
            where: {firstName: firstName, lastName: lastName},
        });
    };

    Student.addNewStudent = async (student) => Student.create({
        ...student
    });

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
