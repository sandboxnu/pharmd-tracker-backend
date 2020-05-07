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

    Student: sequelize.import('./student'),

    Course: sequelize.import('./course'),

    Assessment: sequelize.import('./assessment'),

    Note: sequelize.import('./note'),

    PCF: sequelize.import('./pcf'),

    User: sequelize.import('./user'),

};

// To create new models: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

// StudentCourse Association
models.Course.belongsToMany(models.Student, {through: models.StudentCourse, foreignKey:'courseID', sourceKey:'courseID'});
models.Student.belongsToMany(models.Course, {through: models.StudentCourse, foreignKey:'NUID', sourceKey:'NUID'});

// StudentAssessment Association
models.Student.belongsToMany(models.Assessment, {through: models.StudentAssessment, foreignKey:'NUID',
    sourceKey:'NUID'});
models.Assessment.belongsToMany(models.Student, {through: models.StudentAssessment, foreignKey:'assessmentID',
    sourceKey:'assessmentID'});

// // course - assessment
models.Assessment.belongsTo(models.Course, {foreignKey: 'courseID'});
models.Course.hasMany(models.Assessment, {foreignKey: 'courseID'});
//
// // student - note
models.Note.belongsTo(models.Student, {foreignKey: 'NUID'});
models.Student.hasMany(models.Note, {foreignKey: 'NUID'});


// student - pcf
models.Student.hasMany(models.PCF, {foreignKey: 'NUID'});
models.PCF.belongsTo(models.Student, {foreignKey: 'NUID'});


Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;
