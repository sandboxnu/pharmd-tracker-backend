import Sequelize from 'sequelize';
const sequelize = new Sequelize("postgres://postgres:[PASSWORD]@localhost:5432/pharmdDB", {
    dialect: 'postgres',
    },
);
const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message'),
};
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;