'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentExam = sequelize.define('StudentExam', {
    examID: {
      type: DataTypes.STRING
    },
    NUID: {
      type: DataTypes.STRING
    },
    examName: {
      type: DataTypes.STRING
    },
    percentage: {
      type: DataTypes.STRING
    },
    letterGrade: {
      type: DataTypes.STRING
    }
  }, {});
  StudentExam.associate = function(models) {
    // associations can be defined here
  };
  return StudentExam;
};