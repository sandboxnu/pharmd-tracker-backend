'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('studentcourse', {
    NUID: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [9, 9],
          msg: "ID must consist of 9 digits"
        }
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
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
  };

  // get all student courses that match the given parameters
  StudentCourse.filter = async params => {
    return StudentCourse.findAll({
      where: params
    });
  };

  // gets the given student's course
  StudentCourse.getStudentCourse = async (NUID, courseID) => {
    return StudentCourse.findOne({
      where: {NUID: NUID, courseID: courseID}
    })
  };

  // gets the given student's courses in the given term
  StudentCourse.getStudentCoursesByTerm = async (NUID, term) => {
    return StudentCourse.findAll({
      where: {NUID: NUID, term: term}
    })
  };

  StudentCourse.addNewSC = async (sc) => StudentCourse.create({
    ...sc
  });

  StudentCourse.updateStudentCourse = async (NUID, courseID, body) => StudentCourse.update({
    ...body
  }, {
    where: {
      NUID: NUID,
      assessmentID: courseID
    }
  });

  return StudentCourse;
};