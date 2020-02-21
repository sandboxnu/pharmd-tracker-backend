// TODO notes shold have tags, date, title, body

const note = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
        noteID: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
            allowNull: true
        }
    });
};