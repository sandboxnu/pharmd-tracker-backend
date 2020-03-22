import {Sequelize} from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(

    'postgres',

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

};

models.Student.belongsToMany(models.Course, {through: models.StudentCourse, foreignKey:'NUID', sourceKey:'NUID'});
models.Course.belongsToMany(models.Student, {through: models.StudentCourse, foreignKey:'courseID', sourceKey:'courseID'});
models.Student.belongsToMany(models.Assessment, {through: models.StudentAssessment, foreignKey:'NUID',
sourceKey:'NUID'});
models.Assessment.belongsToMany(models.Student, {through: models.StudentAssessment, foreignKey:'assessmentID',
sourceKey:'assessmentID'});


Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;