import uuidv4 from 'uuid/v4';

// TODO class averages

const course = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
        courseID: {
          type: DataTypes.STRING,
          unique: true,
          primaryKey: true
        },
        courseName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        }
    });

    // --------------------------- GET METHODS ---------------------------

    // get the course with the given id
    Course.findById = async courseID => {
        return Course.findOne({
            where: {courseID: courseID}
        });
    };

    // get the first course with the given name
    Course.findByName = async (courseName) => {
        return Course.findOne({
            where: {courseName: courseName},
        });
    };

    // get the students in a given course
    Course.getStudentsByCourseID = async courseID => {
        return Course.findById(courseID).getStudents();
    };

    // --------------------------- POST METHODS ---------------------------

    // TODO update method to have correct fields in a course
    /**
     * Adds a new course the database
     * @param courseInfo an object holding the info about the course
     * @returns {Promise<Model> | Model}
     */
    Course.addNewCourse = async (courseInfo) => Course.create({
        courseID: uuidv4(),
        courseName: courseInfo.courseName,
    });

    // --------------------------- PUT METHODS ---------------------------

    /**
     * Updates a course with the given ID with given info
     * @param courseId the ID of course to update
     * @param courseInfo the info to update
     * @returns {Promise<[number, Model[]]>}
     */
    Course.updateCourse = async (courseID, courseInfo) => Course.update({
        ...courseInfo
    }, {
        where: {
            courseID
        }
    });

    return Course;
};

export default course;
