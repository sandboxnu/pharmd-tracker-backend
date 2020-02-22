const student = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        NUID: {
            type: DataTypes.STRING,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            unique: false,
        },
        lastName: {
            type: DataTypes.STRING,
            unique: false,
        },
        preferredName: {
            type: DataTypes.STRING,
            unique: false,
        },
        visa: {
            type: DataTypes.STRING,
            unique: false,
        },
        entryType: {
            type: DataTypes.STRING,
            unique: false,
        },
        entryToP1: {
            type: DataTypes.STRING,
            unique: false,
        },
        originalGradDate: {
            type: DataTypes.STRING,
            unique: false,
        },
        adjustedGradDate: {
            type: DataTypes.STRING,
            unique: false,
        },
        gradDateChange: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
        },
        dualDegree: {
            type: DataTypes.STRING,
            unique: false,
        },
        leftProgram: {
            type: DataTypes.STRING,
            unique: false,
        },
        GPA: {
            type: DataTypes.INTEGER,
            unique: false,
        },
    });
    Student.associate = models => {
        Student.belongsToMany(models.Course, {through: 'StudentCourses'});
    };
    /**
     * Gets all students in the DB
     * @returns {Promise<<Model[]>>} a promise to respond query
     */
    Student.getAllStudents = async () => {
        return student.findAll();
    };
    /**
     * Gets all students with the given cohort
     * @param cohort the requested cohort
     * @returns {Promise<<Model[]>>}
     */
    Student.getCohort = async (cohort) => {
        return student.findAll({
            where: {adjustedGradDate: cohort}
        });
    };
    Student.getCourses = async (nuid) => {
        const student = student.findOne({where: {NUID: nuid}});
        return student.getCourses();
    };
    /**
     * Finds a student with the given NUID
     * @param nuid the requested NUID
     * @returns {Promise<<Model<any, any> | null>|<Model<any, any>>>}
     */
    Student.findByNUID = async nuid => {
        return student.findOne({
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
        return student.findOne({
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
