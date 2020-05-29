'use strict';
import assessment from './assessment';
import student from "./student";
import uuidv4 from 'uuid/v4';

const studentAssessment = (sequelize, DataTypes) => {
  const StudentAssessment = sequelize.define('studentassessment', {
    assessmentID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    NUID: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: {
          args: [9, 9],
          msg: "ID must consist of 9 digits"
        }
      },
      allowNull: false;
    },
    courseID: { // this should be a foreign key
      type: DataTypes.STRING,
      allowNull: false
    },
    assessmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.DOUBLE,
      validate: {
        min: 0,
        max: 100
      },
    },
    letterGrade: {
      type: DataTypes.ENUM('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F')
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['NUID', 'assessmentID']
      }
    ]});
  StudentAssessment.associate = function(models) {
    // associations can be defined here
  };

  StudentAssessment.filter = async params => {
    let parsedParams = await StudentAssessment.parseQuery(params);
    return StudentAssessment.findAll({
      where: parsedParams
    });
  };

  const {Op} = require('sequelize');

  StudentAssessment.parseQuery = async (queryObj) => {
    let where = {};
    let queryParams = ['studentAssessmentID', 'assessmentID', 'NUID', 'courseID',
      'assessmentName', 'percentage', 'letterGrade'];

    for (const param of queryParams) {
      if (param in queryObj) {
        let query = queryObj[param];

        if (param === 'assessmentName') {
          where[param] = {[Op.substring]: query};
        }
        else if (query.hasOwnProperty('min') || query.hasOwnProperty('max')) {
          if (query.hasOwnProperty('min')) {
              where[param] = {...where[param], ...{[Op.gte]: query.min}};
          }
          if (query.hasOwnProperty('max')) {
              where[param] = {...where[param], ...{[Op.lte]: query.max}};
          }
        }
        else {
          where[param] = query;
        }
      }
    }
    console.log("Query params for where are:  ", where);
    return where;
  };

  StudentAssessment.getStudentAssessment = async (NUID, assessmentID) => {
    return StudentAssessment.findOne({
      where: {NUID: NUID, assessmentID: assessmentID}
    })
  };

  StudentAssessment.getStudentAssessmentsByCourse = async (NUID, courseID) => {
    return StudentAssessment.findAll({
      where: {NUID: NUID, courseID: courseID}
    })
  };

  StudentAssessment.getStudentAssessmentsByTestID = async (assessmentID) => {
    return StudentAssessment.findAll({
      where: {assessmentID: assessmentID}
    })
  };

  StudentAssessment.addNewSA = async (sa) => StudentAssessment.create({
    ...sa
  });

  /**
   * Adds a new Student Assessment to the DB
   * @param {{
   *     assessmentID: string,
   *     NUID: string,
   *     courseID: string,
   *     assessmentName: string,
   *     percentage: number,
   *     letterGrade: string
   * }} body
   * @param studentLastName {string} the last name of student who did assessment
   * @param studentFirstName {string} the first name of student who did assessment
   * @returns {Promise<void>} A promise resolving to the newly created assessment
   */
  StudentAssessment.createStudentAssessment = async (body, studentLastName, studentFirstName) => {
    const std = student(sequelize, DataTypes);
    // figure out if student exists yet
    std.findOne({
      where: {
        NUID: body.NUID
      }
    }).then(res => {
      if (res) {
        // Student exists
        return StudentAssessment.create({
          ...body,
          studentAssessmentID: uuidv4()
        })
      } else {
        // Student doesn't exist--make it
        std.addNewStudent({
          NUID: body.NUID,
          lastName: studentLastName,
          firstName: studentFirstName,
        }).then(
            () => {
              return StudentAssessment.create({
                ...body,
                studentAssessmentID: uuidv4()
              })
            }
        ).catch(err => console.error(err))
      }
    }).catch(err => console.error(err));
  };

  StudentAssessment.updateStudentAssessment = async (NUID, assessmentID, body) => StudentAssessment.update({
    ...body
  }, {
    where: {
      NUID: NUID,
      assessmentID: assessmentID
    }
  });

  /**
   * A student assessment with basic information, sent from frontend
   * @typedef {Object<string, any>} BasicStudentAssessment
   * @property {string} NUID
   * @property {string} courseName
   * @property {string} assessmentName
   * @property {string} courseTerm
   * @property {number} percentage
   * @property {string} lastName
   * @property {string} firstName
   * @property {string} courseID
   */

  /**
   * Adds many assessments to the DB
   * @param {Array<BasicStudentAssessment>} assessments student assessments to add to DB
   * @returns {Promise<void> | void} A promise signifying the success of this transaction
   */
  StudentAssessment.addManyAssessments = async (assessments) => {
    const newAssessments = new Map();
    const ass = assessment(sequelize, DataTypes);
    for (const studAss of assessments) {
      ass.findOne({
        where: {
          assessmentName: studAss.assessmentName
        }
      }).then(res => {
        if (res || newAssessments.has(studAss.assessmentName)) {
          // Assignment already exists
          const assID = res ? res.get('assessmentID') : newAssessments.get(studAss.assessmentName);
          // Make a new student assessment, setting it's
          return StudentAssessment.createStudentAssessment({
            studentAssessmentID: uuidv4(),
            assessmentID: assID,
            NUID: studAss.NUID,
            courseID: studAss.courseID,
            assessmentName: studAss.assessmentName,
            percentage: studAss.percentage,
            letterGrade: 'A',
          }, studAss.lastName, studAss.firstName)
        } else {
          // Must create assignment
          const newAssID = uuidv4();
          newAssessments.set(studAss.assessmentName, newAssID);
          ass.create({
            assessmentName: studAss.assessmentName,
            type: 'Exam',
            courseID: studAss.courseID,
            assessmentID: newAssID
          }).then(res => {
            return StudentAssessment.createStudentAssessment({
              assessmentID: res.get('assessmentID'),
              NUID: studAss.NUID,
              courseID: studAss.courseID,
              assessmentName: studAss.assessmentName,
              percentage: studAss.percentage,
              letterGrade: 'A'
            }, studAss.lastName, studAss.firstName)
          }).catch(err => {
            console.error(err);
            return err;
          })
        }
      }).catch(err => console.error(err))

    }

  };


  return StudentAssessment;
};

export default studentAssessment;