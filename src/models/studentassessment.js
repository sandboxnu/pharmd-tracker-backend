'use strict';

module.exports = (sequelize, DataTypes) => {
  const StudentAssessment = sequelize.define('studentassessment', {
    assessmentID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    NUID: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [9, 9],
          msg: "ID must consist of 9 digits"
        }
      },
      primaryKey: true,
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

  StudentAssessment.updateStudentAssessment = async (NUID, assessmentID, body) => StudentAssessment.update({
    ...body
  }, {
    where: {
      NUID: NUID,
      assessmentID: assessmentID
    }
  });

  return StudentAssessment;
};