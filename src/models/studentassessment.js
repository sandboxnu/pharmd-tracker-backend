'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentAssessment = sequelize.define('StudentAssessment', {
    assessmentID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    NUID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assessmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    letterGrade: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  StudentAssessment.associate = function(models) {
    // associations can be defined here
  };
  return StudentAssessment;
};