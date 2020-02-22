import uuidv4 from 'uuid/v4';

const course = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
        courseId: {
          type: DataTypes.STRING,
          unique: true,
          primaryKey: true
        },
        courseName: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
    Course.associate = models => {
        Course.hasMany(models.Exam, { onDelete: 'CASCADE' });
    };
    Course.associate = models => {
        Course.belongsToMany(models.Student, {})
    };

    Course.findById = async courseID => {
        return course.findOne({
            where: {courseID: courseID}
        });
    };

    Course.findByName = async (courseName) => {
        return course.findOne({
            where: {courseName: courseName},
        });
    };

    // TODO update method to have correct fields in a course
    /**
     * Adds a new course the database
     * @param courseInfo an object holding the info about the course
     * @returns {Promise<Model> | Model}
     */
    Course.addNewCourse = async (courseInfo) => Course.create({
        courseId: uuidv4(),
        courseName: courseInfo.courseName,
    });

    /**
     * Updates a course with the given ID with given info
     * @param courseId the ID of course to update
     * @param courseInfo the info to update
     * @returns {Promise<[number, Model[]]>}
     */
    Course.updateCourse = async (courseId, courseInfo) => Course.update({
        ...courseInfo
    }, {
        where: {
            courseId
        }
    });

    return Course;
};

export default course;
