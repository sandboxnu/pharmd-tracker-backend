const course = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {

        courseName: {
            type: DataTypes.STRING,
            unique: true,
        },
        examList: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
        },
    });
    Course.associate = models => {
        Course.hasMany(models.Exam, { onDelete: 'CASCADE' });
    };
    return Course;
};
export default course;