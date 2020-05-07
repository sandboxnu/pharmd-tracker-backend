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

    // gets assessments that match teh given filter params
    Assessment.filter = async params => {
        return Assessment.findAll({
            where: params
        });
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
