const student = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        NUID: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        notes: {
            type: DataTypes.STRING,
            unique: false,
        }
    });
    Student.findByNUID = async nuid => {
        return await Student.findOne({
            where: { NUID: nuid },
        });
    };
    Student.findByFirstLastName = async (firstName, lastName) => {
        return await Student.findOne({
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
