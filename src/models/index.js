import {Sequelize} from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(

    process.env.DB,

    process.env.DB_USERNAME,

    process.env.DB_PASSWORD,

    {
        host: process.env.SERVER,

        port: process.env.DB_PORT,

        dialect: 'postgres'
    }

);

const models = {

<<<<<<< HEAD
=======
    StudentCourse: sequelize.import('./studentcourse'),

    StudentAssessment: sequelize.import('./studentassessment'),

  //  CourseAssessment: sequelize.import('./courseassessment'),

>>>>>>> 6ee10e932ff7c43abf8968e4ef19deaf42399001
    Student: sequelize.import('./student'),

    Course: sequelize.import('./course'),

    Assessment: sequelize.import('./assessment'),

    Note: sequelize.import('./note'),

<<<<<<< HEAD
    PCF: sequelize.import('pcf'),

    StudentCourse: sequelize.import('./studentcourse'),

    StudentAssessment: sequelize.import('./studentassessment'),

    StudentNote: sequelize.import('./studentnote')

};

// student - course
models.Student.belongsToMany(models.Course, {through: models.StudentCourse, foreignKey:'NUID', sourceKey:'NUID'});
models.Course.belongsToMany(models.Student, {through: models.StudentCourse, foreignKey:'courseID', sourceKey:'courseID'});
// student - assessment
=======
//    StudentNote: sequelize.import('./studentnote'),

};

// StudentCourse Association
models.Student.belongsToMany(models.Course, {through: models.StudentCourse, foreignKey:'NUID', sourceKey:'NUID'});
models.Course.belongsToMany(models.Student, {through: models.StudentCourse, foreignKey:'courseID', sourceKey:'courseID'});

// StudentAssessment Association
>>>>>>> 6ee10e932ff7c43abf8968e4ef19deaf42399001
models.Student.belongsToMany(models.Assessment, {through: models.StudentAssessment, foreignKey:'NUID',
sourceKey:'NUID'});
models.Assessment.belongsToMany(models.Student, {through: models.StudentAssessment, foreignKey:'assessmentID',
sourceKey:'assessmentID'});
<<<<<<< HEAD
// course - assessment
models.Course.hasMany(models.Assessment, {foreignKey: 'courseID'});
models.Assessment.belongsTo(models.Course);
// student - note
models.Student.hasMany(models.Note, {foreignKey:'NUID'});
models.Note.belongsTo(models.Student);
// student - pcf
models.Student.hasMany(models.PCF, {foreignKey:'NUID'});
models.PCF.belongsTo(models.Student);
=======

// // CourseAssessment Association
models.Assessment.belongsTo(models.Course);
models.Course.hasMany(models.Assessment);
//
// // StudentNote Association
models.Note.belongsTo(models.Student);
models.Student.hasMany(models.Note);

>>>>>>> 6ee10e932ff7c43abf8968e4ef19deaf42399001

Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;