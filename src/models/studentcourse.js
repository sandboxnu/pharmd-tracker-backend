'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    NUID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    letterGrade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };
  return StudentCourse;
};