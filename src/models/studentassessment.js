'use strict';
import assessment from './assessment';
import student from "./student";
import uuidv4 from 'uuid/v4';

module.exports = (sequelize, DataTypes) => {
  const StudentAssessment = sequelize.define('studentassessment', {
    studentAssessmentID: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    assessmentID: {
      type: DataTypes.STRING,
    },
    NUID: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [9, 9],
          msg: "ID must consist of 9 digits"
        }
      },
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
  }, {});
  StudentAssessment.associate = function(models) {
    // associations can be defined here
  };

  StudentAssessment.filter = async params => {
    return StudentAssessment.findAll({
      where: params
    });
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
   * @param body an object with the contents of the assessment, of shape <br/> {
   *    assessmentID: string,
   *    NUID: string,
   *    courseID: string (ex PHMD1203),
   *    assessmentName: string,
   *    percentage: number,
   *    letterGrade: string
   * }
   * @param studentLastName the last name of student who did assessment
   * @param studentFirstName the first name of student who did assessment
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
            res => {
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
   * Adds many assessments to the DB
   * @param assessments array of shape<br/>
   *  [
   *    {
   *        NUID: string;
   *        courseName: string (ex PHMD5900)
   *        examName: string;
   *        courseTerm: string (ex Spring 2020)
   *        percentage: number;
   *        studentName: string (Last, First)
   *    }...
   *  ]
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
            assessmentID: assID,
            NUID: studAss.NUID,
            courseID: studAss.courseID,
            assessmentName: studAss.assessmentName,
            percentage: studAss.percentage,
            letterGrade: 'A'
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
