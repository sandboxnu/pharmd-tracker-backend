import {Op} from "sequelize";
import uuidv4 from 'uuid/v4';

const assessment = (sequelize, DataTypes) => {
    const Assessment = sequelize.define('assessment', {
        assessmentID: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        assessmentName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        // TODO: check if type is still necessary
        type: {
            type: DataTypes.ENUM('Exam', 'Quiz'),
            unique: false,
            allowNull:false
        }
    });

    /**
     * @typedef {Object<string, any>} AssessmentType
     * @property {string} assessmentID
     * @property {string} assessmentName
     * @property {'Exam' | 'Quiz'} type
     */

    // --------------------------- GET METHODS ---------------------------

    // gets assessments that match the given filter params
    Assessment.filter = async params => {
        let parsedParams = Assessment.parseQuery(params);
        return Assessment.findAll({
            where: parsedParams
        });
    };

    const {Op} = require('sequelize');

    Assessment.parseQuery = async (queryObj) => {
        let where = {};
        let queryParams = ['assessmentID', 'assessmentName', 'type'];

        for (const param of queryParams) {
            if (param in queryObj) {
                let query = queryObj[param];

                if (param === 'assessmentName') {
                    where[param] = {[Op.substring]: query};
                }
                else {
                    where[param] = query;
                }
            }
        }
        console.log("Query params for where are:  ", where);
        return where;
    };

    // gets the assessment with the given id
    Assessment.findById = async assessmentID => {
        return Assessment.findOne({
            where: {assessmentID: assessmentID}
        });
    };

    /**
     * Gets an assessment with the given name
     * @param {string} assessmentName
     * @returns {Promise<Assessment | null> | null}
     */
    Assessment.findByName = async assessmentName => {
        return Assessment.findOne({
            where: {assessmentName : assessmentName}
        });
    };

    /**
     * Queries all assessments for a provided student in their provided course
     * @param studentId the student whose assessment need querying
     * @param course the course to look for assessments in
     * @returns {Promise<Model[]>} a promise providing the requested assessments
     */
    // Assessment.getStudentAssessmentFromClass = async (studentID, course) =>
    //     await Assessment.findAll({
    //         where: {
    //             [Op.and]: [
    //                 {course}
    //             ]
    //         }
    //     });

    // --------------------------- POST METHODS ---------------------------

    /**
     * Adds a new assessment to this DB
     * @param {AssessmentType} assessment the object holding data about assessment to be added
     * @returns {Promise<void> | Model} a promise providing a callback from creation
     */
    Assessment.addNewAssessment = async (assessment) =>
        Assessment.create({
            ...assessment
        });

    // --------------------------- PUT METHODS ---------------------------

    /**
     *
     * @param {string} assessmentID
     * @param {AssessmentType} assessment
     * @returns {Promise<[number, Model[]]>}
     */
    Assessment.updateAssessment = async (assessmentID, assessment) => Assessment.update({
        ...assessment
    }, {
        where: {
            assessmentID: assessmentID
        }
    });


    return Assessment;
};

export default assessment;
