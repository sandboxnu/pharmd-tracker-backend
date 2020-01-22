const Sequelize = require('sequelize');
const sequelize = new Sequelize('database-name', 'username', 'password', {
    dialect: 'postgres'
});
const Model = Sequelize.Model;
class Student extends Model {}
Student.init({
    //attributes
    sID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Student'
});



