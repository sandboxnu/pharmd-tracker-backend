'use strict';

// TODO to match name conventions
module.exports = (sequelize, DataTypes) => {
  const StudentAssessment = sequelize.define('StudentAssessment', {
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

  StudentAssessment.getStudentAssessment = async (NUID, assessmentID) => {
    return StudentAssessment.findOne({
      where: {NUID: NUID, assessmentID: assessmentID}
    })
  };

  return StudentAssessment;
};