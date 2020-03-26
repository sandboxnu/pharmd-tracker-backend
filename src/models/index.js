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

    StudentCourse: sequelize.import('./studentcourse'),

    StudentAssessment: sequelize.import('./studentassessment'),

  //  CourseAssessment: sequelize.import('./courseassessment'),

    Student: sequelize.import('./student'),

    Course: sequelize.import('./course'),

    Assessment: sequelize.import('./assessment'),

    Note: sequelize.import('./note'),

//    StudentNote: sequelize.import('./studentnote'),

};

// StudentCourse Association
models.Student.belongsToMany(models.Course, {through: models.StudentCourse, foreignKey:'NUID', sourceKey:'NUID'});
models.Course.belongsToMany(models.Student, {through: models.StudentCourse, foreignKey:'courseID', sourceKey:'courseID'});

// StudentAssessment Association
models.Student.belongsToMany(models.Assessment, {through: models.StudentAssessment, foreignKey:'NUID',
sourceKey:'NUID'});
models.Assessment.belongsToMany(models.Student, {through: models.StudentAssessment, foreignKey:'assessmentID',
sourceKey:'assessmentID'});

// // CourseAssessment Association
models.Assessment.belongsTo(models.Course);
models.Course.hasMany(models.Assessment);
//
// // StudentNote Association
models.Note.belongsTo(models.Student);
models.Student.hasMany(models.Note);


Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;