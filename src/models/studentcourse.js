'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    NUID: {
      type: DataTypes.STRING,
      validate:{
        args: [9,9],
        msg: "ID must consist of 9 digits"
      },
      allowNull: false
    },
    courseID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.DOUBLE,
      validate: {
        min: 0,
        max: 100
      },
      allowNull: true
    },
    letterGrade: {
      type: DataTypes.ENUM('A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'),
      allowNull: true
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quizAverage: {
      type: DataTypes.DOUBLE,
      validate: {
        min: 0,
        max: 100
      },
    }
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };
  return StudentCourse;
};