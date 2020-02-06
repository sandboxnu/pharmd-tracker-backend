const exam = (sequelize, DataTypes) => {
    const Exam = sequelize.define('exam', {

        examName: {
            type: DataTypes.STRING,
            unique: true,
        },
        course: {
            type: DataTypes.STRING,
            unique: false,
        },
    });
    return Exam;
};
export default exam;