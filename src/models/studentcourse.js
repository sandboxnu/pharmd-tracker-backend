'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    NUID: {
      type: DataTypes.STRING
    },
    courseId: {
      type: DataTypes.STRING
    },
    percentage: {
      type: DataTypes.STRING
    },
    letterGrade: {
      type: DataTypes.STRING
    },
    quizAverage: {
      type: DataTypes.STRING
    }
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };
  return StudentCourse;
};