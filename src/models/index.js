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

    Student: sequelize.import('./student'),

    Course: sequelize.import('./course'),

    Assessment: sequelize.import('./assessment'),

};

models.Student.belongsToMany(models.Course, {through: 'StudentCourse', foreignKey:'NUID', sourceKey:'NUID'});
models.Course.belongsToMany(models.Student, {through: 'StudentCourse', foreignKey:'courseID', sourceKey:'courseID'});
models.Student.belongsToMany(models.Assessment, {through: 'StudentAssessment', foreignKey:'NUID',
sourceKey:'NUID'});
models.Assessment.belongsToMany(models.Student, {through: 'StudentAssessment', foreignKey:'assessmentID',
sourceKey:'assessmentID'});


Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;