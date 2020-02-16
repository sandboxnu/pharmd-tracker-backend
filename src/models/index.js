import Sequelize from 'sequelize';

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

    Exam: sequelize.import('./exam'),

};

Object.keys(models).forEach(key => {

    if ('associate' in models[key]) {

        models[key].associate(models);

    }

});

export { sequelize };

export default models;