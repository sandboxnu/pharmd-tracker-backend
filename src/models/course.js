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

    // get all courses that match filter params
    Course.filter = async params => {
        let parsedParams = Course.parseQuery(params);
        return Course.filter({
            where: parsedParams
        });
    };

    const Sequelize = require('sequelize');
    const {startsWith}  = Sequelize.Op;

    // parse a course query
    Course.parseQuery = async (queryObj) => {
        let where = {};
        let queryParams = ['courseID', 'courseName'];

        for (const param of queryParams) {
            if (param in queryObj) {
                let query = queryObj[param];

                if (param === 'courseName') {
                    where[param] = {[substring]: query};
                }
                else {
                    where[param] = query;
                }
            }
        }
        return where;
    };

    /**
     * Get the course with the given id
     * @param {string} courseID
     * @returns {Promise<Model<any, any> | null>}
     */
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
    Course.getStudentsByCourse = async courseID => {
        const course = await Course.findById(courseID);
        return course.getStudents();
    };

    // get assessments by course id
    Course.getAssessmentsByCourse = async courseID => {
        const course = await Course.findById(courseID);
        return course.getAssessments();
    };

    // --------------------------- POST METHODS ---------------------------

    // TODO update method to have correct fields in a course
    /**
     * Adds a new course the database
     * @param courseInfo an object holding the info about the course
     * @returns {Promise<Model> | Model}
     */
    Course.addNewCourse = async (courseBody) => Course.create({
        ...courseBody
    });

    // --------------------------- PUT METHODS ---------------------------

    /**
     *
     * @param courseID
     * @param courseInfo
     * @returns {Promise<<[number, Model[]]>>}
     */
    Course.updateCourse = async (courseID, courseInfo) => Course.update({
        ...courseInfo
    }, {
        where: {
            courseID: courseID
        }
    });

    return Course;
};

export default course;
