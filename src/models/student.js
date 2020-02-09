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
        Student.hasMany(models.Course, { onDelete: 'CASCADE' });
    };
    Student.findByNUID = async nuid => {
        return await student.findOne({
            where: { NUID: nuid },
        });
    };
    Student.findByFirstLastName = async (firstName, lastName) => {
        return await student.findOne({
            where: { firstName: firstName, lastName: lastName},
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
